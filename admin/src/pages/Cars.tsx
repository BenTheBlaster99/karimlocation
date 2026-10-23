import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import * as bookcarsTypes from ':bookcars-types'
import * as bookcarsHelper from ':bookcars-helper'
import * as helper from '@/utils/helper'
import env from '@/config/env.config'
import { strings } from '@/lang/cars'
import Layout from '@/components/Layout'
import CarList from '@/components/CarList'
import * as SupplierService from '@/services/SupplierService'

import '@/assets/css/cars.css'

const Cars = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState<bookcarsTypes.User>()
  const [suppliers, setSuppliers] = useState<string[]>()
  const [loading, setLoading] = useState(true)
  const [language, setLanguage] = useState(env.DEFAULT_LANGUAGE)

  const onLoad = async (_user?: bookcarsTypes.User) => {
    setUser(_user)
    setLanguage(_user?.language as string)
    const _isAdmin = helper.admin(_user)

    if (_isAdmin) {
      const _allSuppliers = await SupplierService.getAllSuppliers()
      setSuppliers(bookcarsHelper.flattenSuppliers(_allSuppliers))
    } else {
      setSuppliers([(_user && _user._id) as string])
    }

    setLoading(false)
  }

  return (
    <Layout onLoad={onLoad} strict>
      {user && (
        <div className="cars">
          <div className="col-2">
            <Button type="submit" variant="contained" className="btn-primary new-car" size="small" onClick={() => navigate('/create-car')}>
              {strings.NEW_CAR}
            </Button>
            <CarList
              user={user}
              suppliers={suppliers}
              carSpecs={{}}
              carType={bookcarsHelper.getAllCarTypes()}
              gearbox={[bookcarsTypes.GearboxType.Automatic, bookcarsTypes.GearboxType.Manual]}
              mileage={[bookcarsTypes.Mileage.Limited, bookcarsTypes.Mileage.Unlimited]}
              fuelPolicy={bookcarsHelper.getAllFuelPolicies()}
              deposit={-1}
              availability={[bookcarsTypes.Availablity.Available, bookcarsTypes.Availablity.Unavailable]}
              range={bookcarsHelper.getAllRanges()}
              multimedia={[]}
              rating={-1}
              seats={-1}
              keyword=""
              loading={loading}
              language={language}
              hideSupplier
            />
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Cars
