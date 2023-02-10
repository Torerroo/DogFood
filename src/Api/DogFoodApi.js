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

  async getAllProducts(search, token) {
    this.checkToken(token)
    const res = await fetch(`${this.baseURL}/products?query=${search}`, {
      headers: {
        authorization: this.getAuthorizationToken(token),
      },
    })
    return res.json()
  }
}

export const dogFoodApi = new DogFoodApi({ baseURL: 'https://api.react-learning.ru' })
