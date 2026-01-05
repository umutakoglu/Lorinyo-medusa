import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useEffect } from "react"

const AdminBrandingWidget = () => {
    useEffect(() => {
        // Admin panel'e custom CSS enjekte et
        const style = document.createElement('style')
        style.innerHTML = `
      /* Login sayfasındaki "Medusa'ya Hoş Geldiniz" metnini gizle ve değiştir */
      .h1-core:contains("Medusa") {
        visibility: hidden;
        position: relative;
      }
      
      .h1-core::after {
        content: "Lorinyo'ya Hoş Geldiniz";
        visibility: visible;
        position: absolute;
        left: 0;
        top: 0;
      }
      
      /* Alternatif: Tüm "Medusa" kelimelerini gizle */
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
    `
        document.head.appendChild(style)

        // JavaScript ile metin değiştirme (daha güvenilir)
        const replaceText = () => {
            const h1Elements = document.querySelectorAll('h1.h1-core')
            h1Elements.forEach(el => {
                if (el.textContent?.includes("Medusa")) {
                    el.textContent = el.textContent.replace("Medusa'ya Hoş Geldiniz", "Lorinyo'ya Hoş Geldiniz")
                    el.textContent = el.textContent.replace("Medusa", "Lorinyo")
                }
            })
        }

        // Initial replacement
        replaceText()

        // MutationObserver ile dinamik değişiklikleri yakala
        const observer = new MutationObserver(replaceText)
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        })

        return () => {
            document.head.removeChild(style)
            observer.disconnect()
        }
    }, [])

    return null // Bu widget görünmez
}

export const config = defineWidgetConfig({
    zone: "login.before",
})

export default AdminBrandingWidget
