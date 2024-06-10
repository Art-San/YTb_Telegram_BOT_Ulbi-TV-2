import React from 'react'
import Button from '../Button/Button'
import { useTelegram } from '../../hooks/useTelegram'
import './Header.css'

const Header = () => {
  const { user, queryId, onClose } = useTelegram()

  return (
    <div className={'header'}>
      <Button onClick={onClose}>Закрыть</Button>
      <div className="data">
        <span className={'username'}>{user?.username || 'null'}</span>
        <span className={'queryId'}>{user?.id || 'null'}</span>
        <span className={'queryId'}>{queryId || 'null'}</span>
      </div>
    </div>
  )
}

export default Header
