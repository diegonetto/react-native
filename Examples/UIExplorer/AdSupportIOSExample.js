/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 */
'use strict';

var AdSupportIOS = require('AdSupportIOS');

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

exports.framework = 'React';
exports.title = 'Advertising ID';
exports.description = 'Example of using the ad support API.';

exports.examples = [
  {
    title: 'Ad Support IOS',
    render: function() {
      return <AdSupportIOSExample />;
    },
  }
];

var AdSupportIOSExample = React.createClass({
  getInitialState: function() {
    return {
      deviceID: 'No IDFA yet',
      hasAdvertiserTracking: 'unset',
    };
  },

  componentDidMount: function() {
    AdSupportIOS.getAdvertisingId(
      this._onDeviceIDSuccess,
      this._onDeviceIDFailure
    );

    AdSupportIOS.getAdvertisingTrackingEnabled(
      this._onHasTrackingSuccess,
      this._onHasTrackingFailure
    );
  },

  _onHasTrackingSuccess: function(hasTracking) {
    this.setState({
      'hasAdvertiserTracking': hasTracking,
    });
  },

  _onHasTrackingFailure: function(e) {
    this.setState({
      'hasAdvertiserTracking': 'Error!',
    });
  },

  _onDeviceIDSuccess: function(deviceID) {
    this.setState({
      'deviceID': deviceID,
    });
  },

  _onDeviceIDFailure: function(e) {
    this.setState({
      'deviceID': 'Error!',
    });
  },

  render: function() {
    return (
      <View>
        <Text>
          <Text style={styles.title}>Advertising ID: </Text>
          {JSON.stringify(this.state.deviceID)}
        </Text>
        <Text>
          <Text style={styles.title}>Has Advertiser Tracking: </Text>
          {JSON.stringify(this.state.hasAdvertiserTracking)}
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
});
