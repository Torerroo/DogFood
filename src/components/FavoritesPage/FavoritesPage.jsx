import FavoritesStyles from './FavoritesPage.module.css'

export function FavoritesPage() {
  return (
    <section className={FavoritesStyles.favorites}>
      <div className={FavoritesStyles.favorites__container}>Избранное</div>
    </section>
  )
}
