import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
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
