import React from "react";
import { ScrollView, Text, View, StyleSheet, Linking } from "react-native";

const Page = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Privacy Policy</Text>
      <Text style={styles.paragraph}>
        This privacy policy applies to the YumYap app (hereby referred to as
        "Application") for mobile devices that was created by John McCants
        (hereby referred to as "Service Provider") as a Freemium service. This
        service is intended for use "AS IS".
      </Text>
      <Text style={styles.heading}>Information Collection and Use</Text>
      <Text style={styles.paragraph}>
        The Application collects information when you download and use it. This
        information may include information such as
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          • Your device's Internet Protocol address (e.g., IP address)
        </Text>
        <Text style={styles.listItem}>
          • The pages of the Application that you visit, the time and date of
          your visit, the time spent on those pages
        </Text>
        <Text style={styles.listItem}>• The time spent on the Application</Text>
        <Text style={styles.listItem}>
          • The operating system you use on your mobile device
        </Text>
      </View>
      <Text style={styles.paragraph}>
        The Application does not gather precise information about the location
        of your mobile device.
      </Text>
      <View style={styles.hidden}>
        <Text style={styles.paragraph}>
          The Application collects your device's location, which helps the
          Service Provider determine your approximate geographical location and
          make use of in below ways:
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            • Geolocation Services: The Service Provider utilizes location data
            to provide features such as personalized content, relevant
            recommendations, and location-based services.
          </Text>
          <Text style={styles.listItem}>
            • Analytics and Improvements: Aggregated and anonymized location
            data helps the Service Provider to analyze user behavior, identify
            trends, and improve the overall performance and functionality of the
            Application.
          </Text>
          <Text style={styles.listItem}>
            • Third-Party Services: Periodically, the Service Provider may
            transmit anonymized location data to external services. These
            services assist them in enhancing the Application and optimizing
            their offerings.
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        The Service Provider may use the information you provided to contact you
        from time to time to provide you with important information, required
        notices and marketing promotions.
      </Text>
      <Text style={styles.paragraph}>
        For a better experience, while using the Application, the Service
        Provider may require you to provide us with certain personally
        identifiable information. The information that the Service Provider
        requests will be retained by them and used as described in this privacy
        policy.
      </Text>
      <Text style={styles.heading}>Third Party Access</Text>
      <Text style={styles.paragraph}>
        Only aggregated, anonymized data is periodically transmitted to external
        services to aid the Service Provider in improving the Application and
        their service. The Service Provider may share your information with
        third parties in the ways that are described in this privacy statement.
      </Text>
      <Text style={styles.paragraph}>
        Please note that the Application utilizes third-party services that have
        their own Privacy Policy about handling data. Below are the links to the
        Privacy Policy of the third-party service providers used by the
        Application:
      </Text>
      <View style={styles.list}>
        <Text
          style={styles.link}
          onPress={() =>
            Linking.openURL("https://www.google.com/policies/privacy/")
          }
        >
          • Google Play Services
        </Text>
        <Text
          style={styles.link}
          onPress={() => Linking.openURL("https://expo.io/privacy")}
        >
          • Expo
        </Text>
      </View>
      <Text style={styles.paragraph}>
        The Service Provider may disclose User Provided and Automatically
        Collected Information:
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          • as required by law, such as to comply with a subpoena, or similar
          legal process;
        </Text>
        <Text style={styles.listItem}>
          • when they believe in good faith that disclosure is necessary to
          protect their rights, protect your safety or the safety of others,
          investigate fraud, or respond to a government request;
        </Text>
        <Text style={styles.listItem}>
          • with their trusted services providers who work on their behalf, do
          not have an independent use of the information we disclose to them,
          and have agreed to adhere to the rules set forth in this privacy
          statement.
        </Text>
      </View>
      <Text style={styles.heading}>Opt-Out Rights</Text>
      <Text style={styles.paragraph}>
        You can stop all collection of information by the Application easily by
        uninstalling it. You may use the standard uninstall processes as may be
        available as part of your mobile device or via the mobile application
        marketplace or network.
      </Text>
      <Text style={styles.heading}>Data Retention Policy</Text>
      <Text style={styles.paragraph}>
        The Service Provider will retain User Provided data for as long as you
        use the Application and for a reasonable time thereafter. If you'd like
        them to delete User Provided Data that you have provided via the
        Application, please contact them at johnmccants002@gmail.com and they
        will respond in a reasonable time.
      </Text>
      <Text style={styles.heading}>Children</Text>
      <Text style={styles.paragraph}>
        The Service Provider does not use the Application to knowingly solicit
        data from or market to children under the age of 13.
      </Text>
      <Text style={styles.paragraph}>
        The Application does not address anyone under the age of 13. The Service
        Provider does not knowingly collect personally identifiable information
        from children under 13 years of age. In the case the Service Provider
        discovers that a child under 13 has provided personal information, the
        Service Provider will immediately delete this from their servers. If you
        are a parent or guardian and you are aware that your child has provided
        us with personal information, please contact the Service Provider
        (johnmccants002@gmail.com) so that they will be able to take the
        necessary actions.
      </Text>
      <Text style={styles.heading}>Security</Text>
      <Text style={styles.paragraph}>
        The Service Provider is concerned about safeguarding the confidentiality
        of your information. The Service Provider provides physical, electronic,
        and procedural safeguards to protect information the Service Provider
        processes and maintains.
      </Text>
      <Text style={styles.heading}>Changes</Text>
      <Text style={styles.paragraph}>
        This Privacy Policy may be updated from time to time for any reason. The
        Service Provider will notify you of any changes to the Privacy Policy by
        updating this page with the new Privacy Policy. You are advised to
        consult this Privacy Policy regularly for any changes, as continued use
        is deemed approval of all changes.
      </Text>
      <Text style={styles.paragraph}>
        This privacy policy is effective as of 2024-05-13
      </Text>
      <Text style={styles.heading}>Your Consent</Text>
      <Text style={styles.paragraph}>
        By using the Application, you are consenting to the processing of your
        information as set forth in this Privacy Policy now and as amended by
        us.
      </Text>
      <Text style={styles.heading}>Contact Us</Text>
      <Text style={styles.paragraph}>
        If you have any questions regarding privacy while using the Application,
        or have questions about the practices, please contact the Service
        Provider via email at johnmccants002@gmail.com.
      </Text>
      <Text style={styles.paragraph}>
        This privacy policy page was generated by{" "}
        <Text
          style={styles.link}
          onPress={() =>
            Linking.openURL("https://app-privacy-policy-generator.nisrulz.com/")
          }
        >
          App Privacy Policy Generator
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    justifyContent: "center",
    maxWidth: 1200,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  paragraph: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
  },
  list: {
    marginTop: 10,
    marginLeft: 20,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  hidden: {
    display: "none",
  },
});

export default Page;
