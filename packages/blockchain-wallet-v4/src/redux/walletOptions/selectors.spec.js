import * as selectors from './selectors'
import { getInvitations } from '../settings/selectors'
import MockWalletOptions from '../../../../../config/mocks/wallet-options-v4.json'
import Remote from '../../remote'

jest.mock('../settings/selectors')
getInvitations.mockReturnValue(Remote.of({}))

describe('walletOptions selectors', () => {
  const successState = {
    walletOptionsPath: Remote.Success(MockWalletOptions)
  }

  it('getBtcNetwork should return correct network', () => {
    expect(selectors.getBtcNetwork(successState)).toEqual(Remote.of('bitcoin'))
  })

  it('getEthTxFuse should return correct lastTxFuse', () => {
    expect(selectors.getEthTxFuse(successState)).toEqual(Remote.of(600))
  })

  it('getAnnouncements should return correct announcements', () => {
    const expected = {
      public: {},
      wallet: {},
      lockbox: {},
      swap: {}
    }
    expect(selectors.getAnnouncements(successState)).toEqual(
      Remote.of(expected)
    )
  })

  it('getCoinAvailability should return correct btc availability', () => {
    const expected = {
      send: true,
      request: true,
      lockbox: true,
      exchangeFrom: true,
      exchangeTo: true,
      syncToPit: true
    }
    expect(selectors.getCoinAvailability(successState, 'BTC')).toEqual(
      Remote.of(expected)
    )
  })

  it('getCoinAvailability should return correct eth availability', () => {
    const expected = {
      send: true,
      request: true,
      lockbox: true,
      exchangeFrom: true,
      exchangeTo: true,
      syncToPit: true
    }
    expect(selectors.getCoinAvailability(successState, 'ETH')).toEqual(
      Remote.of(expected)
    )
  })
})
