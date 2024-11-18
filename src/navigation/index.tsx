import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import TabRoutes from './tab.routes';
import StackRoutes from './stack.routes';

export default function Routes () {
    return (
        <NavigationIndependentTree>
                <NavigationContainer>
                    <StackRoutes/>
                </NavigationContainer>
        </NavigationIndependentTree>        
        
    )
}
