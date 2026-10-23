import React, { useState, useEffect, ReactNode } from 'react'
import * as bookcarsTypes from ':bookcars-types'
import * as UserService from '@/services/UserService'
import { useAnalytics } from '@/utils/useAnalytics'
import { useUserContext, UserContextType } from '@/context/UserContext'
import Unauthorized from '@/components/Unauthorized'

interface LayoutProps {
  strict?: boolean
  children: ReactNode
  onLoad?: (user?: bookcarsTypes.User) => void
}

const Layout = ({
  strict,
  children,
  onLoad
}: LayoutProps) => {
  useAnalytics()

  const { user, userLoaded, unauthorized } = useUserContext() as UserContextType
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = UserService.getCurrentUser()

    if (!currentUser && strict) {
      UserService.signout(true, false)
    } else if (userLoaded) {
      setLoading(false)

      if (onLoad) {
        onLoad(user || undefined)
      }
    }
  }, [user, userLoaded, strict]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {!(unauthorized && strict) && (!!user || !loading) && (
        <div className="content">{children}</div>
      )}
      {unauthorized && strict && <Unauthorized />}
    </>
  )
}

export default Layout
