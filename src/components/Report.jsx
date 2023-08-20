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
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = ({ img }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image style={{width:"75px",height:"75px"}} src={Logo} />
          <Text>Flow State</Text>
        </View>
        <View>
          <Image src={{ uri: img }} />
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
