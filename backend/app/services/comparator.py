import difflib
import time
from typing import List

from diff_match_patch import diff_match_patch

from ..models import ComparisonResult, DiffBlock, ChangeType


class DocumentComparator:
    def __init__(self) -> None:
        self.dmp = diff_match_patch()

    def compare(self, text1: str, text2: str) -> ComparisonResult:
        start_time = time.time()

        sm = difflib.SequenceMatcher(None, text1, text2)
        similarity = sm.ratio() * 100

        diffs = self.dmp.diff_main(text1, text2)
        self.dmp.diff_cleanupSemantic(diffs)

        diff_blocks = self._build_diff_blocks(diffs)

        additions = sum(1 for d in diff_blocks if d.type == ChangeType.INSERTED)
        deletions = sum(1 for d in diff_blocks if d.type == ChangeType.DELETED)
        modifications = sum(1 for d in diff_blocks if d.type == ChangeType.MODIFIED)

        processing_time = (time.time() - start_time) * 1000

        return ComparisonResult(
            similarity_score=round(similarity, 2),
            total_changes=len(diff_blocks),
            additions=additions,
            deletions=deletions,
            modifications=modifications,
            diff_blocks=diff_blocks,
            left_text=text1,
            right_text=text2,
            processing_time_ms=round(processing_time, 2),
        )

    def _build_diff_blocks(self, diffs) -> List[DiffBlock]:
        blocks: List[DiffBlock] = []
        left_pos = 0
        right_pos = 0

        for op, data in diffs:
            length = len(data)

            if op == 0:  # EQUAL
                block = DiffBlock(
                    type=ChangeType.UNCHANGED,
                    left_content=data,
                    right_content=data,
                    left_start=left_pos,
                    left_end=left_pos + length,
                    right_start=right_pos,
                    right_end=right_pos + length,
                )
                left_pos += length
                right_pos += length

            elif op == -1:  # DELETE
                block = DiffBlock(
                    type=ChangeType.DELETED,
                    left_content=data,
                    right_content=None,
                    left_start=left_pos,
                    left_end=left_pos + length,
                    right_start=right_pos,
                    right_end=right_pos,
                )
                left_pos += length

            else:  # INSERT (op == 1)
                block = DiffBlock(
                    type=ChangeType.INSERTED,
                    left_content=None,
                    right_content=data,
                    left_start=left_pos,
                    left_end=left_pos,
                    right_start=right_pos,
                    right_end=right_pos + length,
                )
                right_pos += length

            # Agrupa modificações (delete + insert consecutivos)
            if blocks and blocks[-1].type == ChangeType.DELETED and block.type == ChangeType.INSERTED:
                last = blocks[-1]
                blocks[-1] = DiffBlock(
                    type=ChangeType.MODIFIED,
                    left_content=last.left_content,
                    right_content=block.right_content,
                    left_start=last.left_start,
                    left_end=last.left_end,
                    right_start=block.right_start,
                    right_end=block.right_end,
                )
            else:
                blocks.append(block)

        return blocks

    def generate_redline_html(self, result: ComparisonResult, side: str = "both") -> dict:
        if side == "left":
            return {"left": self._render_side(result.diff_blocks, "left")}
        if side == "right":
            return {"right": self._render_side(result.diff_blocks, "right")}
        return {
            "left": self._render_side(result.diff_blocks, "left"),
            "right": self._render_side(result.diff_blocks, "right"),
        }

    def _render_side(self, blocks: List[DiffBlock], side: str) -> str:
        html_parts: list[str] = []

        for block in blocks:
            content = block.left_content if side == "left" else block.right_content
            if content is None:
                continue

            escaped = (
                content.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\n", "<br>")
            )

            if block.type == ChangeType.UNCHANGED:
                html_parts.append(f'<span class="unchanged">{escaped}</span>')
            elif block.type == ChangeType.DELETED and side == "left":
                html_parts.append(
                    f'<span class="deleted" style="background:#ffcccc;text-decoration:line-through;">{escaped}</span>'
                )
            elif block.type == ChangeType.INSERTED and side == "right":
                html_parts.append(
                    f'<span class="inserted" style="background:#ccffcc;">{escaped}</span>'
                )
            elif block.type == ChangeType.MODIFIED:
                if side == "left":
                    html_parts.append(
                        f'<span class="modified-old" style="background:#ffcccc;text-decoration:line-through;">{escaped}</span>'
                    )
                else:
                    html_parts.append(
                        f'<span class="modified-new" style="background:#ccffcc;">{escaped}</span>'
                    )

        return "".join(html_parts)
