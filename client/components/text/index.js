import React, { PropTypes } from 'react';
import FormFieldset from 'components/forms/form-fieldset';
import FormLegend from 'components/forms/form-legend';
import { sanitize } from 'dompurify';

const renderTitle = ( title ) => {
	if ( ! title ) {
		return null;
	}

	return (
		<FormLegend>{ title }</FormLegend>
	);
};

const renderText = ( text ) => {
	/* for dangerouslySetInnerHTML we need to pause linting for a narrow scope */
	/* eslint-disable */
	return (
		<span dangerouslySetInnerHTML={ { __html: sanitize( text, { ADD_ATTR: ['target'] } ) } }>
		</span>
	);
	/* eslint-enable */
}

const Text = ( { id, layout, value } ) => {
	return (
		<FormFieldset>
			{ renderTitle( layout.title ) }
			<p id={ id } className={ layout.class } >
				{ renderText( value ) }
			</p>
		</FormFieldset>
	);
};

Text.propTypes = {
	id: PropTypes.string.isRequired,
	layout: PropTypes.shape( {
		class: PropTypes.string,
		title: PropTypes.string,
	} ),
	value: PropTypes.string.isRequired,
};

export default Text;
