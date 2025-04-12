'use client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from '~/theme'
import GNB from '~/components/GNB'
import Box from '@mui/material/Box'
import ClientWalletProvider from '~/hocs/ClientWalletProvider'
import { Provider as JotaiProvider } from 'jotai'
import { TransactionStateProvider } from '~/hocs/TransactionStateProvider'
import ErrorBoundary from '~/components/ErrorBoundary'
import { SnackbarProvider } from 'notistack'
import { styled } from '@mui/material/styles'
import StoryAppProvider from '~/hocs/StoryAppContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <ThemeProvider theme={theme}>
        <ClientWalletProvider>
          <TransactionStateProvider>
            <StoryAppProvider>
              <SnackbarProvider maxSnack={3}>
                <ErrorBoundary>
                  <Box sx={{ display: 'flex', backgroundColor: '#0f0e14' }}>
                    <CssBaseline />
                    <GNB />

                    <Box
                      component="main"
                      sx={{
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                      }}>
                      {children}
                    </Box>
                    {/* {IS_DEV && isOpenInit && <InitEnterScreen onClose={() => setIsOpenInit(false)} />} */}
                  </Box>
                </ErrorBoundary>
              </SnackbarProvider>
            </StoryAppProvider>
          </TransactionStateProvider>
        </ClientWalletProvider>
      </ThemeProvider>
    </JotaiProvider>
  )
}

export const StyledSection = styled('section')`
	max-width: 1085px;
	margin: 0 auto;
  padding-bottom: 20px;
	${(props) => props.theme.breakpoints.up('md')} {
		padding-top: 120px;
	}
	${(props) => props.theme.breakpoints.down('md')} {
		padding: 110px 0px;
	}
`