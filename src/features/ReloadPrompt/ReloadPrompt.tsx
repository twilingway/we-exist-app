import { useRegisterSW } from 'virtual:pwa-register/react';

import './ReloadPrompt.css'

function ReloadPrompt() {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            // eslint-disable-next-line prefer-template
            console.log('SW Registered: ' + r)
        },
        onRegisterError(error) {
            console.log('SW registration error', error)
        },
        onNeedRefresh() {
            console.log('need refresh', needRefresh);
        }
    })

    const close = () => {
        setNeedRefresh(false)
    }

    return (
        <div className="ReloadPrompt-container">
            { needRefresh
                && <div className="ReloadPrompt-toast">
                    <div className="ReloadPrompt-message">
                        <span>New content available, click on reload button to update.</span>
                    </div>
                    { needRefresh && <button className="ReloadPrompt-toast-button" onClick={() => updateServiceWorker(true)}>Reload</button> }
                    <button className="ReloadPrompt-toast-button" onClick={() => close()}>Close</button>
                </div>
            }
        </div>
    )
}

export default ReloadPrompt
