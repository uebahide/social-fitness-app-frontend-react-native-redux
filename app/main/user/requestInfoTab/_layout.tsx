import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import IndexUser from "./indexUser";
import Requests from "./requests";
import Friends from "./friends";

const Tab = createMaterialTopTabNavigator();

export default function RootLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="find users" component={IndexUser} />
      <Tab.Screen name="requests" component={Requests} />
      <Tab.Screen name="friends" component={Friends} />
    </Tab.Navigator>
  );
}
