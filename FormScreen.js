import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, SafeAreaView, ScrollView, Alert, RefreshControl } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Checkbox } from 'react-native-paper';

const styles = require('./App.js').styles;

const FormScreen = () => {
  const [submitted, setSubmitted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const countryList = [
    'Australia', 'Canada', 'United States', 'United Kingdom', 'Singapore', 'Vietnam', 'India', 'Germany', 'France', 'Japan', 'Other'
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
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.formContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.formContent}>
          <Text style={styles.formHeader}>Registration Form</Text>
          {submitted && (
            <View style={styles.successMessage}>
              <Text style={styles.successText}>Form submitted successfully!</Text>
            </View>
          )}
          <Formik
            initialValues={{ name: '', email: '', city: '', country: '', agreeToTerms: false }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, setFieldValue }) => (
              <View>
                <Text style={styles.formLabel}>Full Name:</Text>
                <TextInput
                  style={[styles.input, touched.name && errors.name ? styles.inputError : null]}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  placeholder="Enter your full name"
                  maxLength={100}
                />
                {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                <Text style={styles.formLabel}>Email:</Text>
                <TextInput
                  style={[styles.input, touched.email && errors.email ? styles.inputError : null]}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                <Text style={styles.formLabel}>City:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  value={values.city}
                  placeholder="Enter your city"
                />
                <Text style={styles.formLabel}>Country:</Text>
                <View style={[styles.input, { padding: 0 }]}> 
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {countryList.map((country) => (
                      <Button
                        key={country}
                        title={country}
                        onPress={() => setFieldValue('country', country)}
                        color={values.country === country ? '#2196F3' : '#aaa'}
                      />
                    ))}
                  </ScrollView>
                </View>
                {touched.country && errors.country && <Text style={styles.errorText}>{errors.country}</Text>}
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    status={values.agreeToTerms ? 'checked' : 'unchecked'}
                    onPress={() => setFieldValue('agreeToTerms', !values.agreeToTerms)}
                  />
                  <Text style={styles.checkboxLabel}>
                    {values.agreeToTerms ? '☑' : '☐'} I agree to the terms and conditions
                  </Text>
                </View>
                {touched.agreeToTerms && errors.agreeToTerms && <Text style={styles.errorText}>{errors.agreeToTerms}</Text>}
                <View style={styles.submitButtonContainer}>
                  <Button
                    title={isSubmitting ? 'Submitting...' : 'Submit'}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                    color="#2196F3"
                  />
                </View>
                {isSubmitting && <ActivityIndicator style={styles.formSpinner} size="small" />}
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FormScreen;
