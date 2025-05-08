import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Alert, RefreshControl, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Card, TextInput as PaperTextInput, Button as PaperButton, Checkbox, useTheme, Paragraph } from 'react-native-paper';

const styles = require('./App.js').styles;

const FormScreen = () => {
  const [submitted, setSubmitted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useTheme();
  // Full list of countries and dependencies by area (from Wikipedia, May 2025)
  const countryList = [
    'Russia', 'Canada', 'China', 'United States', 'Brazil', 'Australia', 'India', 'Argentina', 'Kazakhstan', 'Algeria',
    'Democratic Republic of the Congo', 'Greenland (Denmark)', 'Saudi Arabia', 'Mexico', 'Indonesia', 'Sudan', 'Libya',
    'Iran', 'Mongolia', 'Peru', 'Chad', 'Niger', 'Angola', 'Mali', 'South Africa', 'Colombia', 'Ethiopia', 'Bolivia',
    'Mauritania', 'Egypt', 'Tanzania', 'Nigeria', 'Venezuela', 'Namibia', 'Mozambique', 'Pakistan', 'Turkey', 'Chile',
    'Zambia', 'Myanmar', 'Afghanistan', 'South Sudan', 'France', 'Somalia', 'Central African Republic', 'Ukraine',
    'Madagascar', 'Botswana', 'Kenya', 'Yemen', 'Thailand', 'Spain', 'Turkmenistan', 'Cameroon', 'Papua New Guinea',
    'Sweden', 'Uzbekistan', 'Morocco', 'Iraq', 'Paraguay', 'Zimbabwe', 'Japan', 'Germany', 'Republic of the Congo',
    'Finland', 'Vietnam', 'Malaysia', 'Norway', 'Côte d’Ivoire', 'Poland', 'Oman', 'Italy', 'Philippines', 'Ecuador',
    'Burkina Faso', 'New Zealand', 'Gabon', 'Guinea', 'United Kingdom', 'Uganda', 'Ghana', 'Romania', 'Laos',
    'Guyana', 'Belarus', 'Kyrgyzstan', 'Senegal', 'Syria', 'Cambodia', 'Uruguay', 'Tunisia', 'Suriname', 'Bangladesh',
    'Nepal', 'Tajikistan', 'Greece', 'Nicaragua', 'Eritrea', 'North Korea', 'Malawi', 'Benin', 'Honduras', 'Liberia',
    'Bulgaria', 'Cuba', 'Guatemala', 'Iceland', 'South Korea', 'Hungary', 'Portugal', 'Jordan', 'Serbia', 'Azerbaijan',
    'Austria', 'United Arab Emirates', 'Czech Republic', 'Panama', 'Sierra Leone', 'Ireland', 'Georgia', 'Sri Lanka',
    'Lithuania', 'Latvia', 'Togo', 'Croatia', 'Bosnia and Herzegovina', 'Costa Rica', 'Slovakia', 'Dominican Republic',
    'Estonia', 'Denmark', 'Netherlands', 'Switzerland', 'Bhutan', 'Taiwan', 'Guinea-Bissau', 'Moldova', 'Belgium',
    'Lesotho', 'Armenia', 'Albania', 'Solomon Islands', 'Equatorial Guinea', 'Burundi', 'Haiti', 'Rwanda',
    'North Macedonia', 'Djibouti', 'Belize', 'El Salvador', 'Israel', 'Slovenia', 'New Caledonia (France)', 'Fiji',
    'Kuwait', 'Swaziland', 'East Timor', 'Bahamas', 'Montenegro', 'Vanuatu', 'Falkland Islands (UK)', 'Qatar',
    'Gambia', 'Jamaica', 'Kosovo', 'Lebanon', 'Cyprus', 'Brunei', 'Trinidad and Tobago', 'Cape Verde', 'Samoa',
    'Luxembourg', 'Mauritius', 'Comoros', 'Hong Kong (China)', 'Western Sahara', 'Sao Tome and Principe', 'Kiribati',
    'Dominica', 'Tonga', 'Micronesia', 'Singapore', 'Bahrain', 'Saint Lucia', 'Andorra', 'Palau', 'Seychelles',
    'Antigua and Barbuda', 'Barbados', 'Saint Vincent and the Grenadines', 'Grenada', 'Malta', 'Maldives', 'Saint Kitts and Nevis',
    'Marshall Islands', 'Liechtenstein', 'San Marino', 'Tuvalu', 'Nauru', 'Monaco', 'Vatican City'
  ];

  const [selectedCountry, setSelectedCountry] = useState('');

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Full name is required')
      .min(3, 'Full name must be at least 3 characters')
      .max(100, 'Full name must be at most 100 characters'),
    email: Yup.string().email('Please enter a valid email').required('Email is required'),
    city: Yup.string(),
    country: Yup.string().required('Country is required'),
    agreeToTerms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions')
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      Alert.alert('Form Submitted', `Name: ${values.name}\nEmail: ${values.email}`);
      setSubmitted(true);
      setSubmitting(false);
      resetForm();
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <ScrollView
        style={styles.formContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ padding: 16 }}
      >
        <Card style={{ backgroundColor: theme.colors.surface, borderRadius: 16, marginBottom: 16, elevation: 3 }}>
          <Card.Content>
            <Paragraph style={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.primary, textAlign: 'center', marginBottom: 16 }}>Registration Form</Paragraph>
            {submitted && (
              <Paragraph style={{ color: theme.colors.primary, textAlign: 'center', marginBottom: 16 }}>Form submitted successfully!</Paragraph>
            )}
            <Formik
              initialValues={{ name: '', email: '', city: '', country: '', agreeToTerms: false }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, setFieldValue }) => (
                <View>
                  <Paragraph style={{ color: theme.colors.text, marginBottom: 4 }}>Full Name:</Paragraph>
                  <PaperTextInput
                    mode="outlined"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    error={touched.name && !!errors.name}
                    style={{ marginBottom: 8, backgroundColor: theme.colors.background, color: 'white' }}
                    theme={{
                      colors: { 
                        primary: theme.colors.primary, 
                        text: 'white', 
                        placeholder: 'white',
                      }
                    }}
                    textColor="white"
                  />
                  {touched.name && errors.name && <Paragraph style={{ color: theme.colors.error }}>{errors.name}</Paragraph>}
                  <Paragraph style={{ color: theme.colors.text, marginBottom: 4, marginTop: 8 }}>Email:</Paragraph>
                  <PaperTextInput
                    mode="outlined"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={touched.email && !!errors.email}
                    style={{ marginBottom: 8, backgroundColor: theme.colors.background, color: 'white' }}
                    theme={{
                      colors: { 
                        primary: theme.colors.primary, 
                        text: 'white', 
                        placeholder: 'white',
                      }
                    }}
                    textColor="white"
                  />
                  {touched.email && errors.email && <Paragraph style={{ color: theme.colors.error }}>{errors.email}</Paragraph>}
                  <Paragraph style={{ color: theme.colors.text, marginBottom: 4, marginTop: 8 }}>City:</Paragraph>
                  <PaperTextInput
                    mode="outlined"
                    value={values.city}
                    onChangeText={handleChange('city')}
                    onBlur={handleBlur('city')}
                    style={{ marginBottom: 8, backgroundColor: theme.colors.background, color: 'white' }}
                    theme={{
                      colors: { 
                        primary: theme.colors.primary, 
                        text: 'white', 
                        placeholder: 'white',
                      }
                    }}
                    textColor="white"
                  />
                  <Paragraph style={{ color: theme.colors.text, marginBottom: 4, marginTop: 8 }}>Country:</Paragraph>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
                    {countryList.map((country) => (
                      <PaperButton
                        key={country}
                        mode={values.country === country ? 'contained' : 'outlined'}
                        onPress={() => setFieldValue('country', country)}
                        style={{ marginRight: 8, borderRadius: 8, backgroundColor: values.country === country ? theme.colors.primary : theme.colors.surface }}
                        labelStyle={{ color: values.country === country ? theme.colors.text : theme.colors.primary }}
                      >
                        {country}
                      </PaperButton>
                    ))}
                  </ScrollView>
                  {touched.country && errors.country && <Paragraph style={{ color: theme.colors.error }}>{errors.country}</Paragraph>}
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
                    <Checkbox
                      status={values.agreeToTerms ? 'checked' : 'unchecked'}
                      onPress={() => setFieldValue('agreeToTerms', !values.agreeToTerms)}
                      color={theme.colors.primary}
                    />
                    <Paragraph style={{ color: theme.colors.text, marginLeft: 8 }}>I agree to the terms and conditions</Paragraph>
                  </View>
                  {touched.agreeToTerms && errors.agreeToTerms && <Paragraph style={{ color: theme.colors.error }}>{errors.agreeToTerms}</Paragraph>}
                  <PaperButton
                    mode="contained"
                    onPress={handleSubmit}
                    disabled={isSubmitting || !values.agreeToTerms}
                    style={{ marginTop: 8, borderRadius: 8, backgroundColor: theme.colors.primary }}
                    labelStyle={{ color: theme.colors.text }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </PaperButton>
                </View>
              )}
            </Formik>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FormScreen;
