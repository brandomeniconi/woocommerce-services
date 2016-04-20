import React, { PropTypes } from 'react';
import CompactCard from 'components/card/compact';
import FormSectionHeading from 'components/forms/form-section-heading';
import RenderItem from './render-item';
import { connect } from 'react-redux';
import * as FormActions from 'state/form/actions';
import { bindActionCreators } from 'redux';
import SaveForm from 'components/save-form';

const Group = ( { group, schema, wooCommerceSettings, settings, form, formActions, saveFormData } ) => {
	switch ( group.type ) {
		case 'fieldset':
			return (
				<CompactCard>
					<FormSectionHeading>{ group.title }</FormSectionHeading>
					{ group.items.map( item => (
						<RenderItem
							key={ item.key ? item.key : item }
							layout={ item }
							schema={ schema }
							wooCommerceSettings={ wooCommerceSettings }
						/>
					) ) }
				</CompactCard>
			);

		case 'actions':
			const setIsSaving = ( value ) => formActions.setField( 'isSaving', value );
			const setSuccess = ( value ) => formActions.setField( 'success', value );
			const setError = ( value ) => formActions.setField( 'error', value );
			const dismissSuccess = () => formActions.setField( 'success', false );
			const saveForm = () => saveFormData( setIsSaving, setSuccess, setError, settings );
			return (
				<CompactCard className="save-button-bar">
					<SaveForm
						saveForm={ saveForm }
						isSaving={ form.isSaving }
						success={ form.success }
						error={ form.error }
						dismissSuccess={ dismissSuccess }
					/>
				</CompactCard>
			);
	}
};

Group.propTypes = {
	group: PropTypes.shape( {
		title: PropTypes.string,
		items: PropTypes.array.isRequired,
	} ),
	schema: PropTypes.object.isRequired,
	wooCommerceSettings: PropTypes.object.isRequired,
	saveFormData: PropTypes.func.isRequired,
	settings: PropTypes.object.isRequired,
	form: PropTypes.object.isRequired,
	formActions: PropTypes.object.isRequired,
};

function mapStateToProps( state ) {
	return {
		settings: state.settings,
		form: state.form,
	};
}

function mapDispatchToProps( dispatch ) {
	return {
		formActions: bindActionCreators( FormActions, dispatch ),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( Group );
