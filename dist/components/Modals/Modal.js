export const Modal = (headerText, bodyContent, bodyCallback) => {

    if (!document.querySelector("#customModalStyle")) {
        const style = document.createElement("style")
        style.id = "customModalStyle"

        style.textContent = `
            .modal {
                position: fixed;
                inset: 0;
                background: rgba(0,0,0,.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            }

            .modal-content {
                background: white;
                width: 75vw;
                height: 90vh;
                padding: 20px;
                border-radius: 8px;
                box-sizing: border-box;
                overflow: auto;
            }

            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .modal-close {
                cursor: pointer;
                font-size: 24px;
            }

            .modal-body {
                margin-top: 20px;
            }
        `

        document.head.appendChild(style)
    }


    const modal = document.createElement("div")
    modal.classList.add("modal")

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${headerText}</h2>
                <span class="modal-close">&times;</span>
            </div>

            <div class="modal-body">${bodyContent}</div>
        </div>
    `

    document.body.appendChild(modal)


    const body = modal.querySelector(".modal-body")

    if (bodyCallback) {

        bodyCallback(body)

    }


    const close = () => {
  
        modal.remove()
    }

    modal.querySelector(".modal-close").addEventListener("click", close)

    modal.addEventListener("click", e => {
        if (e.target === modal) {
            close()
        }
    })
}