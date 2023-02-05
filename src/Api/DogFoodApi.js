class DogFoodApi {
  constructor({ baseURL }) {
    this.baseURL = baseURL
    this.token = ''
  }

  setToken(token) {
    this.token = token
  }

  getAuthorizationHeader() {
    return `Bearer ${this.token}`
  }

  checkToken() {
    if (!this.token) throw new Error('Отсутствует токен')
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

  async getAllProducts(search) {
    this.checkToken()
    const res = await fetch(`${this.baseURL}/products?query=${search}`, {
      headers: {
        authorization: this.getAuthorizationHeader(),
      },
    })
    return res.json()
  }
}

export const dogFoodApi = new DogFoodApi({ baseURL: 'https://api.react-learning.ru' })
