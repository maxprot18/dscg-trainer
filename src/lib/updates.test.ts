import { checkForUpdate, UPDATE_CHECK_INTERVAL_MS, watchForUpdates } from './updates'

function fakeRegistration(waiting: boolean) {
  return { update: vi.fn().mockResolvedValue(undefined), waiting: waiting ? {} : null, installing: null } as unknown as ServiceWorkerRegistration
}

describe('mises à jour', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('vérification à la demande : nouvelle version, dernière version, sans service worker', async () => {
    const withUpdate = fakeRegistration(true)
    vi.stubGlobal('navigator', { onLine: true, serviceWorker: { getRegistration: vi.fn().mockResolvedValue(withUpdate) } })
    expect(await checkForUpdate()).toBe('update')
    expect(withUpdate.update).toHaveBeenCalled()
    vi.stubGlobal('navigator', { onLine: true, serviceWorker: { getRegistration: vi.fn().mockResolvedValue(fakeRegistration(false)) } })
    expect(await checkForUpdate()).toBe('latest')
    vi.stubGlobal('navigator', { onLine: true })
    expect(await checkForUpdate()).toBe('unavailable')
    vi.stubGlobal('navigator', { onLine: false, serviceWorker: {} })
    expect(await checkForUpdate()).toBe('offline')
  })

  it('revérifie toutes les heures et au retour au premier plan', () => {
    vi.useFakeTimers()
    const registration = fakeRegistration(false)
    const stop = watchForUpdates(registration)
    vi.advanceTimersByTime(UPDATE_CHECK_INTERVAL_MS)
    expect(registration.update).toHaveBeenCalledTimes(1)
    document.dispatchEvent(new Event('visibilitychange'))
    expect(registration.update).toHaveBeenCalledTimes(2)
    stop()
    vi.advanceTimersByTime(UPDATE_CHECK_INTERVAL_MS)
    expect(registration.update).toHaveBeenCalledTimes(2)
  })
})
