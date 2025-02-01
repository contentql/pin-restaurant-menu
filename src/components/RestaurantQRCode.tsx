'use client'

import { Button, useTheme } from '@payloadcms/ui'
import html2canvas from 'html2canvas'
import { ArrowDownToLine } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'

const RestaurantQRCode = () => {
  const [url, setURL] = useState('')
  const { theme } = useTheme()

  useEffect(() => {
    setURL(window.location.origin ?? '')
  }, [])

  const saveQRCode = () => {
    const element = document.getElementById('generated-qr-code')

    if (element) {
      html2canvas(element)
        .then(canvas => {
          // Convert the canvas to a data URL
          const dataURL = canvas.toDataURL('image/png')

          // Create a download link
          const link = document.createElement('a')
          link.href = dataURL
          link.download = 'qr-code.png'

          // Trigger the download
          link.click()
        })
        .catch(error => {
          console.log({ error })
        })
    }
  }

  const qrColor =
    theme === 'dark'
      ? { bg: 'var(--theme-elevation-1000)', color: 'var(--theme-elevation-0)' }
      : { bg: 'var(--theme-elevation-0)', color: 'var(--theme-elevation-1000)' }

  return (
    <>
      <p>Restaurant QR-Code</p>

      {url ? (
        <div
          style={{
            padding: '1rem',
            borderRadius: '1rem',
            backgroundColor: qrColor.bg,
            overflow: 'hidden',
            width: 'max-content',
          }}
          id='generated-qr-code'>
          <QRCodeSVG value={url} size={300} color={qrColor.color} />
        </div>
      ) : (
        <div
          style={{
            padding: '1rem',
            borderRadius: '1rem',
            backgroundColor: qrColor.bg,
            height: '24rem',
            width: '24rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <p style={{ color: qrColor.color }}>Loading QR-Code...</p>
        </div>
      )}

      <Button
        onClick={saveQRCode}
        disabled={!url}
        icon={<ArrowDownToLine size={20} />}
        iconPosition='left'
        aria-label='Download QR-Code'
        className='download-qr-btn'>
        Download QR-Code
      </Button>
    </>
  )
}

export default RestaurantQRCode
