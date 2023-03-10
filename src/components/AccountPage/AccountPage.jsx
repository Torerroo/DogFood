import { useSelector } from 'react-redux'
import { getUserInfoSelector } from '../../redux/slices/userInfoSlice'
import AccountStyles from './AccountPage.module.css'

export function AccountPage() {
  const user = useSelector(getUserInfoSelector)
  return (
    <section className={AccountStyles.account}>
      <div className={AccountStyles.account__container}>
        <div className={AccountStyles.account__containerItem}>
          <h3>Личный кабинет</h3>
          <img width="200px" src={user.avatar} alt="avatar" />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>
            Группа:
            {' '}
            {user.group}
          </p>
          <p>
            О себе:
            {' '}
            {user.about}
          </p>
        </div>
      </div>
    </section>
  )
}
