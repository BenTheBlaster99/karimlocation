import React, { useMemo, useState } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import {
  eachDayOfInterval,
  eachMonthOfInterval,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns'
import { fr, enUS, es } from 'date-fns/locale'
import * as bookcarsHelper from ':bookcars-helper'
import Layout from '@/components/Layout'
import { strings } from '@/lang/statistics'
import { strings as commonStrings } from '@/lang/common'
import * as helper from '@/utils/helper'
import * as UserService from '@/services/UserService'
import * as BookingService from '@/services/BookingService'
import { RevenueBooking } from '@/services/BookingService'

import '@/assets/css/statistics.css'

type Period = 'week' | 'month' | 'year'

const Statistics = () => {
  const [rows, setRows] = useState<RevenueBooking[]>([])
  const [period, setPeriod] = useState<Period>('month')
  const language = UserService.getLanguage()
  const locale = language === 'fr' ? fr : language === 'es' ? es : enUS
  const now = new Date()

  const onLoad = async () => {
    try {
      const stats = await BookingService.getRevenue()
      setRows(stats.bookings || [])
    } catch (err) {
      helper.error(err)
    }
  }

  const range = useMemo(() => {
    if (period === 'week') {
      return {
        start: startOfWeek(now, { weekStartsOn: 1 }),
        end: endOfWeek(now, { weekStartsOn: 1 }),
      }
    }
    if (period === 'year') {
      return { start: startOfYear(now), end: endOfYear(now) }
    }
    return { start: startOfMonth(now), end: endOfMonth(now) }
  }, [period])

  const periodRows = rows.filter((row) => {
    const paidAt = new Date(row.paidAt || row.to)
    return isWithinInterval(paidAt, range)
  })
  const periodTotal = periodRows.reduce((sum, row) => sum + Number(row.price || 0), 0)
  const allTotal = rows.reduce((sum, row) => sum + Number(row.price || 0), 0)

  const buckets = (period === 'year'
    ? eachMonthOfInterval(range)
    : eachDayOfInterval(range)
  ).map((day) => {
    const total = periodRows.reduce((sum, row) => {
      const paidAt = new Date(row.paidAt || row.to)
      const same = period === 'year'
        ? paidAt.getFullYear() === day.getFullYear() && paidAt.getMonth() === day.getMonth()
        : paidAt.getFullYear() === day.getFullYear() && paidAt.getMonth() === day.getMonth() && paidAt.getDate() === day.getDate()
      return same ? sum + Number(row.price || 0) : sum
    }, 0)
    return {
      key: day.toISOString(),
      label: format(day, period === 'year' ? 'MMM' : period === 'week' ? 'EEE' : 'd', { locale }),
      total,
    }
  })
  const max = Math.max(...buckets.map((bucket) => bucket.total), 1)
  const periodLabel = format(range.start, period === 'year' ? 'yyyy' : period === 'month' ? 'MMMM yyyy' : 'd MMM', { locale })
    + (period === 'week' ? ` – ${format(range.end, 'd MMM yyyy', { locale })}` : '')

  return (
    <Layout onLoad={onLoad} strict>
      <div className="statistics">
        <h1>{strings.TITLE}</h1>
        <ToggleButtonGroup
          exclusive
          value={period}
          onChange={(_event, value: Period | null) => {
            if (value) {
              setPeriod(value)
            }
          }}
          className="period-switch"
        >
          <ToggleButton value="week">{strings.WEEK}</ToggleButton>
          <ToggleButton value="month">{strings.MONTH}</ToggleButton>
          <ToggleButton value="year">{strings.YEAR}</ToggleButton>
        </ToggleButtonGroup>

        <div className="statistics-summary">
          <div className="statistics-card">
            <span>{strings.ALL}</span>
            <strong>{bookcarsHelper.formatPrice(allTotal, commonStrings.CURRENCY, language)}</strong>
          </div>
          <div className="statistics-card">
            <span>{periodLabel}</span>
            <strong>{bookcarsHelper.formatPrice(periodTotal, commonStrings.CURRENCY, language)}</strong>
          </div>
          <div className="statistics-card">
            <span>{strings.COUNT}</span>
            <strong>{periodRows.length}</strong>
          </div>
        </div>

        <div className={`bars ${period}`}>
          {buckets.map((bucket) => (
            <div className="bar-col" key={bucket.key}>
              <div className="bar-track">
                <div className="bar-fill" style={{ height: `${Math.max((bucket.total / max) * 100, bucket.total > 0 ? 8 : 0)}%` }} />
              </div>
              <span>{bucket.label}</span>
            </div>
          ))}
        </div>

        {periodRows.length === 0 ? (
          <div className="empty">{rows.length === 0 ? strings.EMPTY : strings.PERIOD_EMPTY}</div>
        ) : (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{strings.CAR}</TableCell>
                  <TableCell>{strings.CLIENT}</TableCell>
                  <TableCell>{strings.FROM}</TableCell>
                  <TableCell>{strings.TO}</TableCell>
                  <TableCell>{strings.PRICE}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {periodRows.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>{row.licensePlate ? `${row.car} (${row.licensePlate})` : row.car}</TableCell>
                    <TableCell>{row.driver}</TableCell>
                    <TableCell>{format(new Date(row.from), 'd MMM yyyy', { locale })}</TableCell>
                    <TableCell>{format(new Date(row.to), 'd MMM yyyy', { locale })}</TableCell>
                    <TableCell>{bookcarsHelper.formatPrice(row.price, commonStrings.CURRENCY, language)}</TableCell>
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

export default Statistics
