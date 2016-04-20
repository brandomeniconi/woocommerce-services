import React, { PropTypes } from 'react';
import TextField from 'components/text-field';
import RadioButtons from 'components/radio-buttons';
import ShippingServiceGroups from 'components/shipping-service-groups';
import { connect } from 'react-redux';
import * as SettingsActions from 'state/settings/actions';
import * as FormActions from 'state/form/actions';
import { bindActionCreators } from 'redux';

const RenderItem = ( { layout, schema, settings, settingsActions, wooCommerceSettings } ) => {
	const id = layout.key ? layout.key : layout;
	const updateValue = value => settingsActions.updateSettingsField( id, value );
	const updateSubSubValue = ( key, subKey, val ) => settingsActions.updateSettingsObjectSubField( id, key, subKey, val );

	switch ( layout.type ) {
		case 'radios':
			return (
				<RadioButtons
					layout={ layout }
					schema={ schema.properties[id] }
					value={ settings[id] }
					setValue={ updateValue }
				/>
			);

		case 'shipping_services':
			return (
				<ShippingServiceGroups
					services={ schema.definitions.services }
					settings={ settings[id] }
					currencySymbol={ wooCommerceSettings.currency_symbol }
					updateValue={ updateSubSubValue }
					settingsKey={ id }
				/>
			);

		default:
			return (
				<TextField
					id={ id }
					schema={ schema.properties[id] }
					value={ settings[id] }
					placeholder={ layout.placeholder }
					updateValue={ updateValue }
				/>
			);
	}
};

RenderItem.propTypes = {
	layout: PropTypes.oneOfType( [
		PropTypes.string.isRequired,
		PropTypes.object.isRequired,
	] ).isRequired,
	schema: PropTypes.object.isRequired,
	settings: PropTypes.object.isRequired,
	wooCommerceSettings: PropTypes.object.isRequired,
};

function mapStateToProps( state ) {
	return {
		settings: state.settings,
		form: state.form,
	};
}

function mapDispatchToProps( dispatch ) {
	return {
		settingsActions: bindActionCreators( SettingsActions, dispatch ),
		formActions: bindActionCreators( FormActions, dispatch ),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( RenderItem );
