import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import Logo from "../assets/logo.png";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
  },
  logo_section: {
    margin: 10,
    padding: 10,
    marginTop: 35,
    flex: 1 / 4,
    alignItems: "center",
    justifyContent: "center",
    // border: "1px solid black",
  },
  details_section: {
    margin: 10,
    padding: 10,
    flex: 1 / 4,
    // border: "1px solid black",
  },
  chart_section: {
    margin: 10,
    padding: 10,
    flex: 1 / 2,
    justifyContent: "center",
    alignItems: "center",
    // border: "1px solid black",
  },
  info_section: {
    margin: 10,
    padding: 10,
    flex: 1 / 2,
    // border: "1px solid black",
  },
});

// Create Document Component
const MyDocument = ({ img }) => {
  const currentDate = new Date();
  const date = `${currentDate.getDate()}-${currentDate.toLocaleString(
    "default",
    { month: "short" }
  )}-${currentDate.getFullYear()}`;

  return (
    <Document>
      <Page size="A4">
        <View style={styles.logo_section}>
          <Image style={{ width: "200px", height: "235px" }} src={Logo} />
          <Text>Flow State</Text>
        </View>
        <View style={styles.details_section}>
          <Text>{date}</Text>
          <Text>Good day Andre</Text>
          <Text>Current Report</Text>
          <Text>Chart</Text>
        </View>
        <View style={styles.chart_section}>
          <Image src={{ uri: img }} />
        </View>
        <View style={styles.info_section}>
          <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate voluptatem ab assumenda placeat deleniti temporibus minima provident magnam ex aut. Voluptatem excepturi inventore, aspernatur nulla consequuntur ipsa cum aliquid.</Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
