import type { Meta, StoryObj } from '@storybook/react'
import SelectTestnetRPC from './SelectTestnetRPC'

const meta = {
  title: 'Modals/SelectRPC',
  component: SelectTestnetRPC,
  args: {
    activeRPC: 'https://testnet-mock.com',
    anchorEl: null,
    handleClose: () => {},
    networks: [
      {
        networkType: 'Testnet',
        rpc: 'https://testnet-mock.com',
        rpcName: 'Testnet'
      }
    ],
    onSelect: () => {},
    open: true
  }
} satisfies Meta<typeof SelectTestnetRPC>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
