/* eslint-disable class-methods-use-this */
class DogFoodApi {
  constructor({ baseURL }) {
    this.baseURL = baseURL
  }

  getAuthorizationToken(token) {
    return `Bearer ${token}`
  }

  checkToken(token) {
    if (!token) throw new Error('Отсутствует токен')
  }

  async signIn(values) {
    const res = await fetch(`${this.baseURL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    if (res.status === 401) {
      throw new Error('Неверные логин или пароль')
    }
    if (res.status === 404) {
      throw new Error('Пользователь с указанным email не найден')
    }
    if (res.status >= 300) {
      throw new Error(`Ошибка, код ${res.status}`)
    }
    return res.json()
  }

  async signUp(values) {
    const res = await fetch(`${this.baseURL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    if (res.status === 409) {
      throw new Error('Пользователь с указанным email уже существует')
    }
    if (res.status === 400) {
      throw new Error('Некорректно заполнено одно из полей')
    }
    if (res.status >= 300) {
      throw new Error(`Ошибка, код ${res.status}`)
    }
  }

  getProductsByIds(ids, token) {
    return Promise.all(ids.map((id) => fetch(`${this.baseURL}/products/${id}`, {
      headers: {
        authorization: this.getAuthorizationToken(token),
      },
    }).then((res) => res.json())))
  }

  getProductsById(id, token) {
    return fetch(`${this.baseURL}/products/${id}`, {
      headers: {
        authorization: this.getAuthorizationToken(token),
      },
    }).then((res) => res.json())
  }

  getAllReviewsByProductId(id, token) {
    return fetch(`${this.baseURL}/products/review/${id}`, {
      headers: {
        authorization: this.getAuthorizationToken(token),
      },
    }).then((res) => res.json())
  }

  async getAllProducts(search, token) {
    this.checkToken(token)
    const res = await fetch(`${this.baseURL}/products/search?query=${search}`, {
      headers: {
        authorization: this.getAuthorizationToken(token),
      },
    })
    return res.json()
  }

  async addProductReviewById(id, token, values) {
    this.checkToken(token)
    const res = await fetch(`https://api.react-learning.ru/products/review/${id}`, {
      method: 'POST',
      headers: {
        authorization: this.getAuthorizationToken(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при добавлении отзыва к продукту.
      Проверьте отправляемые данные. Status: ${res.status}`)
    }

    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при получении ответа от сервера. 
      Попробуйте сделать запрос позже. Status: ${res.status}`)
    }

    return res.json()
  }

  async deleteProductReviewById(productID, reviewID, token) {
    this.checkToken(token)
    const res = await fetch(`https://api.react-learning.ru/products/review/${productID}/${reviewID}`, {
      method: 'DELETE',
      headers: {
        authorization: this.getAuthorizationToken(token),
      },
    })
    return res.json()
  }

  async addNewProduct(values, token) {
    this.checkToken(token)
    const res = await fetch(`${this.baseURL}/products`, {
      method: 'POST',
      headers: {
        authorization: this.getAuthorizationToken(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при добавлении нового товара.
      Проверьте отправляемые данные.`)
    }

    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при получении ответа от сервера. 
      Попробуйте сделать запрос позже.`)
    }

    return res.json()
  }

  async deleteProductById(productId, token) {
    this.checkToken(token)
    const res = await fetch(`https://api.react-learning.ru/products/${productId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.getAuthorizationToken(token),
      },
    })
    return res.json()
  }

  async editProductById(productId, token, values) {
    this.checkToken(token)
    const res = await fetch(`${this.baseURL}/products/${productId}`, {
      method: 'PATCH',
      headers: {
        authorization: this.getAuthorizationToken(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при редактировании товара.
      Проверьте отправляемые данные.`)
    }

    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при получении ответа от сервера. 
      Попробуйте сделать запрос позже.`)
    }

    return res.json()
  }
}

export const dogFoodApi = new DogFoodApi({ baseURL: 'https://api.react-learning.ru' })
