import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material'
import { format } from 'date-fns'
import { fr, enUS, es } from 'date-fns/locale'
import * as bookcarsTypes from ':bookcars-types'
import * as bookcarsHelper from ':bookcars-helper'
import * as helper from '@/utils/helper'
import * as BookingService from '@/services/BookingService'
import * as PaymentService from '@/services/PaymentService'
import { strings } from '@/lang/checkout-status'
import { strings as commonStrings } from '@/lang/common'
import Toast from '@/components/Toast'

import '@/assets/css/checkout-status.css'

interface CheckoutStatusProps {
  bookingId: string,
  payLater?: boolean,
  language: string,
  status: 'success' | 'error'
  className?: string
}

const CheckoutStatus = (
  {
    bookingId,
    language,
    status,
    className,
  }: CheckoutStatusProps
) => {
  const reportRef = useRef<HTMLElement>(null)
  const [booking, setBooking] = useState<bookcarsTypes.Booking>()
  const [price, setPrice] = useState(0)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    const init = async () => {
      const _booking = await BookingService.getBooking(bookingId)
      setBooking(_booking)
      setPrice(await PaymentService.convertPrice(_booking.price!))
      setLoading(false)
    }

    if (bookingId) {
      init()
    }
  }, [bookingId])

  if (loading) {
    return null
  }

  const success = status === 'success'
  if (!success) {
    return (
      <div className={`checkout-status ${className || ''}`}>
        <Toast title={strings.CONGRATULATIONS} text={strings.ERROR} status={status} />
      </div>
    )
  }

  if (!booking) {
    return null
  }

  const _fr = language === 'fr'
  const _es = language === 'es'
  const _locale = _fr ? fr : _es ? es : enUS
  const dateFormat = _fr ? 'd MMMM yyyy, HH:mm' : 'd MMMM yyyy, p'
  const dayFormat = 'd MMMM yyyy'
  const days = bookcarsHelper.days(new Date(booking.from), new Date(booking.to))
  const car = booking.car as bookcarsTypes.Car
  const driver = booking.driver as bookcarsTypes.User | undefined
  const showEmail = !!driver?.email && !driver.email.endsWith('@example.com')
  const deposit = Number(car.deposit)
  const statusLabel = booking.status === bookcarsTypes.BookingStatus.Reserved
    ? strings.STATUS_RESERVED
    : booking.status === bookcarsTypes.BookingStatus.Paid || booking.status === bookcarsTypes.BookingStatus.PaidInFull
      ? strings.STATUS_PAID
      : booking.status === bookcarsTypes.BookingStatus.Cancelled
        ? strings.STATUS_CANCELLED
        : strings.STATUS_PENDING

  const row = (label: string, value?: string | number | null) => (
    value !== undefined && value !== null && value !== ''
      ? (
        <div className="report-row">
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      )
      : null
  )

  return (
    <div className={`checkout-status ${className || ''}`}>
      <div className="confirmation-actions no-print">
        <p>{strings.SUCCESS_PAY_LATER}</p>
        <Button
          variant="contained"
          className="btn-primary"
          disabled={downloading}
          onClick={async () => {
            if (!reportRef.current) {
              return
            }
            setDownloading(true)
            try {
              const html2canvas = (await import('html2canvas')).default
              const { jsPDF } = await import('jspdf')
              const canvas = await html2canvas(reportRef.current, { scale: 2, backgroundColor: '#ffffff' })
              const image = canvas.toDataURL('image/jpeg', 0.95)
              const pdf = new jsPDF('p', 'mm', 'a4')
              const pageWidth = pdf.internal.pageSize.getWidth()
              const pageHeight = pdf.internal.pageSize.getHeight()
              const imageHeight = (canvas.height * pageWidth) / canvas.width
              let heightLeft = imageHeight
              let position = 0
              pdf.addImage(image, 'JPEG', 0, position, pageWidth, imageHeight)
              heightLeft -= pageHeight
              while (heightLeft > 0) {
                position -= pageHeight
                pdf.addPage()
                pdf.addImage(image, 'JPEG', 0, position, pageWidth, imageHeight)
                heightLeft -= pageHeight
              }
              pdf.save(`karim-location-${booking._id}.pdf`)
            } finally {
              setDownloading(false)
            }
          }}
        >
          {strings.DOWNLOAD_PDF}
        </Button>
      </div>

      <article className="confirmation-report" ref={reportRef}>
        <header className="report-header">
          <div>
            <p className="report-brand">Karim Location</p>
            <h1>{strings.REPORT_TITLE}</h1>
          </div>
          <div className="report-meta">
            <span>{strings.REFERENCE}</span>
            <strong>{booking._id}</strong>
            <span>{strings.ISSUED_ON}</span>
            <strong>{format(new Date(), dayFormat, { locale: _locale })}</strong>
          </div>
        </header>

        <section>
          <h2>{strings.CLIENT}</h2>
          {row(commonStrings.FULL_NAME, driver?.fullName)}
          {row(commonStrings.PHONE, driver?.phone)}
          {showEmail && row(commonStrings.EMAIL, driver?.email)}
          {driver?.birthDate && row(commonStrings.BIRTH_DATE, format(new Date(driver.birthDate), dayFormat, { locale: _locale }))}
        </section>

        <section>
          <h2>{strings.VEHICLE}</h2>
          {row(strings.VEHICLE, car.name)}
          {row(strings.PLATE, car.licensePlate)}
          {row(strings.COLOR, car.color)}
        </section>

        <section>
          <h2>{strings.PICK_UP}</h2>
          {row(strings.PICK_UP, (booking.pickupLocation as bookcarsTypes.Location).name)}
          {row(strings.PICK_UP, format(new Date(booking.from), dateFormat, { locale: _locale }))}
          {row(strings.DROP_OFF, (booking.dropOffLocation as bookcarsTypes.Location).name)}
          {row(strings.DROP_OFF, format(new Date(booking.to), dateFormat, { locale: _locale }))}
          {row(strings.DURATION, helper.getDaysShort(days))}
          {row(strings.AIRPORT_DELIVERY, strings.FREE)}
        </section>

        <section>
          <h2>{strings.PAYMENT}</h2>
          {row(strings.STATUS, statusLabel)}
          {row(strings.TOTAL, bookcarsHelper.formatPrice(price, commonStrings.CURRENCY, language))}
          {deposit > 0 && row(strings.DEPOSIT, bookcarsHelper.formatPrice(deposit, commonStrings.CURRENCY, language))}
          {row(strings.PAYMENT, strings.PAY_AT_PICKUP)}
        </section>

        <p className="report-note">{strings.REPORT_NOTE}</p>
      </article>
    </div>
  )
}

export default CheckoutStatus
