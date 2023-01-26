import { Loader } from '../Loader/Loader'

// eslint-disable-next-line func-names
export const withQuery = (WrappedComponent) => function ({ isLoading, ...rest }) {
  if (isLoading) {
    return (
      <section className="products">
        <Loader />
      </section>
    )
  }
  return <WrappedComponent {...rest} />
}
