import React, { useState, useEffect, CSSProperties, ReactNode } from 'react'
import * as bookcarsTypes from ':bookcars-types'
import * as UserService from '@/services/UserService'
import Unauthorized from './Unauthorized'
import { useUserContext, UserContextType } from '@/context/UserContext'

interface LayoutProps {
  strict?: boolean
  admin?: boolean
  style?: CSSProperties
  children: ReactNode
  onLoad?: (user?: bookcarsTypes.User) => void
}

const Layout = ({
  strict,
  admin,
  style,
  children,
  onLoad
}: LayoutProps) => {
  const { user, userLoaded, setUnauthorized, unauthorized } = useUserContext() as UserContextType
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = UserService.getCurrentUser()

    if (!currentUser && strict) {
      UserService.signout(true)
    } else if (userLoaded) {
      setLoading(false)

      if (onLoad) {
        onLoad(user || undefined)
      }
    }
  }, [user, userLoaded, strict]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (admin && user && user.type !== bookcarsTypes.RecordType.Admin) {
      setUnauthorized(true)
      setLoading(false)
    }
  }, [user, admin]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {(!!user || !loading || !strict) && !unauthorized && (
        <div className="content" style={style || {}}>
          {userLoaded && children}
        </div>
      )}
      {unauthorized && <Unauthorized />}
    </>
  )
}

export default Layout
