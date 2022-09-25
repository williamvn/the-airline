import React from 'react'
import styles from "./Loader.module.css";

export const Loader = () => {
    return (
        <div className={styles.loaderOverlay}>
            <div class={`spinner-grow text-success ${styles.spinnerLg}`} role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    )
}
