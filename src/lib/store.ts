import {writable} from 'svelte/store'
import {browser} from '$app/environment'

export const initialSave = {current: '', done: []}
export const save = localStorageWritable('save', initialSave)

function localStorageWritable(key: string, initial: any) {
    let savedValue

    try {
        savedValue = browser ? JSON.parse(window.localStorage.getItem(key)) ?? initial : initial
    } catch (err) {
        console.error(err)
    }

    const w = writable(savedValue)
    w.subscribe(value => {
        if (browser) window.localStorage.setItem(key, JSON.stringify(value))
    })
    return w
}
