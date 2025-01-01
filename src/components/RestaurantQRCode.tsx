'use client'

import { env } from '@env'
import { Button } from '@payloadcms/ui'
import html2canvas from 'html2canvas'
import { ArrowDownToLine } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

const RestaurantQRCode = () => {
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

  return (
    <>
      <p>Restaurant QR-Code</p>

      <div
        style={{
          padding: '1rem',
          borderRadius: '1rem',
          backgroundColor: 'white',
          overflow: 'hidden',
          width: 'max-content',
        }}
        id='generated-qr-code'>
        <QRCodeSVG value={env.NEXT_PUBLIC_PUBLIC_URL} size={300} />
      </div>

      <Button
        onClick={saveQRCode}
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
