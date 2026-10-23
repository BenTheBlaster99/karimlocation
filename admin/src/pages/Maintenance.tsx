import React, { useState } from 'react'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import { toast } from 'react-toastify'
import Layout from '@/components/Layout'
import { strings } from '@/lang/maintenance'
import * as helper from '@/utils/helper'
import * as CarService from '@/services/CarService'
import { CarMaintenance } from '@/services/CarService'

import '@/assets/css/maintenance.css'

const toInputDate = (value?: string) => {
  if (!value) {
    return ''
  }
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return ''
  }
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

const Maintenance = () => {
  const [rows, setRows] = useState<CarMaintenance[]>([])
  const [savingId, setSavingId] = useState('')

  const onLoad = async () => {
    try {
      const cars = await CarService.getMaintenance()
      setRows(cars.map((car) => ({
        ...car,
        lastOilChangeDate: toInputDate(car.lastOilChangeDate),
        lastServiceDate: toInputDate(car.lastServiceDate),
      })))
    } catch (err) {
      helper.error(err)
    }
  }

  const updateRow = (id: string, field: keyof CarMaintenance, value: string) => {
    setRows((current) => current.map((row) => (
      row._id === id ? { ...row, [field]: value } : row
    )))
  }

  const save = async (row: CarMaintenance) => {
    try {
      setSavingId(row._id)
      const status = await CarService.updateMaintenance(row)
      if (status === 200) {
        toast(strings.SAVED, { type: 'success' })
      } else {
        helper.error()
      }
    } catch (err) {
      helper.error(err)
    } finally {
      setSavingId('')
    }
  }

  return (
    <Layout onLoad={onLoad} strict>
      <div className="maintenance">
        <h1>{strings.TITLE}</h1>
        {rows.length === 0 ? (
          <div className="empty">{strings.EMPTY}</div>
        ) : (
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{strings.CAR}</TableCell>
                  <TableCell>{strings.PLATE}</TableCell>
                  <TableCell>{strings.ODOMETER}</TableCell>
                  <TableCell>{strings.OIL_DATE}</TableCell>
                  <TableCell>{strings.OIL_KM}</TableCell>
                  <TableCell>{strings.SERVICE_DATE}</TableCell>
                  <TableCell>{strings.SERVICE_KM}</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>{row.name}{row.color ? ` · ${row.color}` : ''}</TableCell>
                    <TableCell>{row.licensePlate}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        variant="standard"
                        value={row.odometer ?? ''}
                        onChange={(e) => updateRow(row._id, 'odometer', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="date"
                        variant="standard"
                        value={row.lastOilChangeDate || ''}
                        onChange={(e) => updateRow(row._id, 'lastOilChangeDate', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        variant="standard"
                        value={row.lastOilChangeMileage ?? ''}
                        onChange={(e) => updateRow(row._id, 'lastOilChangeMileage', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="date"
                        variant="standard"
                        value={row.lastServiceDate || ''}
                        onChange={(e) => updateRow(row._id, 'lastServiceDate', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        variant="standard"
                        value={row.lastServiceMileage ?? ''}
                        onChange={(e) => updateRow(row._id, 'lastServiceMileage', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        className="btn-primary"
                        size="small"
                        disabled={savingId === row._id}
                        onClick={() => save(row)}
                      >
                        {strings.SAVE}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </div>
    </Layout>
  )
}

export default Maintenance
