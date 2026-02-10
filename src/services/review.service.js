import prisma from '@/lib/db/prisma'

export async function createReview(clientId, providerId, rating, comment) {
  const review = await prisma.review.create({
    data: {
      clientId,
      providerId,
      rating,
      comment,
    },
  })

  // Atualizar rating médio do prestador
  await updateProviderRating(providerId)

  return review
}

export async function updateProviderRating(providerId) {
  const reviews = await prisma.review.findMany({
    where: { providerId, hidden: false },
  })

  if (reviews.length === 0) return

  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length

  await prisma.providerProfile.update({
    where: { id: providerId },
    data: {
      rating: avgRating,
      reviewCount: reviews.length,
    },
  })
}

export async function hideReview(reviewId) {
  return await prisma.review.update({
    where: { id: reviewId },
    data: { hidden: true },
  })
}
