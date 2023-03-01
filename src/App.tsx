import './App.css'
import { AppRoot, SplitLayout, SplitCol, View, Panel } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'

import PlayingField from '@/pages/PlayingField'

const App = () => {
  return (
    <AppRoot>
      <SplitLayout>
        <SplitCol>
          <View activePanel="main">
            <Panel id="main">
              <PlayingField />
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  )
}

export default App
