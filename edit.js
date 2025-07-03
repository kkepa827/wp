const { __ } = wp.i18n;
const { useBlockProps, InspectorControls, BlockControls, PanelColorSettings } = wp.blockEditor;
const { Disabled } = wp.components;
const { createElement } = wp.element;
const ServerSideRender = wp.serverSideRender;

import { renderTextField } from '../../utils/render-functions/renderTextField.js';
import { renderTextareaField } from '../../utils/render-functions/renderTextareaField.js';
import { renderImageField } from '../../utils/render-functions/renderImageField.js';
import { renderHeadlineField } from '../../utils/render-functions/renderHeadlineField.js';
import { RepeaterField } from '../../utils/render-functions/RepeaterField.js';
import { LinkField } from '../../utils/render-functions/LinkField.js';

import { blockStyle, containerStyle, subtitleStyle } from '../../utils/common-styles.js';
import previewMode from '../../utils/common-preview-mode.js';

const Edit = ({ attributes, setAttributes }) => {
	const { toggleButton, isPreviewMode, togglePreviewMode } = previewMode();
	const blockProps = useBlockProps();

	const repeaterFields = [
		{
			name: 'headline',
			label: 'Nagłówek',
			renderFunction: renderTextField,
			default: '',
		},
		{
			name: 'content',
			label: 'Treśc',
			renderFunction: renderTextareaField,
			default: '',
		}
	];

	return createElement(
		wp.element.Fragment,
		null,
		createElement(BlockControls, null, toggleButton),
		createElement(
			InspectorControls,
			null,
			createElement(PanelColorSettings, {
				title: __('Ustawienia kolorów', 'weblegend-block'),
				initialOpen: false,
				colorSettings: [
					{
						value: attributes.backgroundColor,
						onChange: (color) => setAttributes({ backgroundColor: color }),
						label: __('Kolor tła', 'weblegend-block'),
					},
					{
						value: attributes.textColor,
						onChange: (color) => setAttributes({ textColor: color }),
						label: __('Kolor tekstu', 'weblegend-block'),
					},
					{
						value: attributes.svgColor,
						onChange: (color) => setAttributes({ svgColor: color }),
						label: __('Kolor SVG', 'weblegend-block'),
					},
				]
			})
		),
		isPreviewMode
			? createElement(
					wp.element.Fragment,
					null,
					createElement(
						Disabled,
						null,
						createElement(ServerSideRender, {
							block: 'weblegend/about-us',
							attributes: attributes,
						})
					),
					toggleButton
				)
			: createElement(
				'div',
				{ ...blockProps, style: blockStyle },
				createElement(
					'h2',
					{
						style: {
							marginBottom: '20px',
							borderBottom: '1px solid #ccc',
							paddingBottom: '10px',
						},
					},
					__('About us', 'weblegend-block')
				),
				createElement(
					'div',
					{ style: containerStyle },
					createElement(
						'p',
						{ style: subtitleStyle },
						__('Nagłówek', 'weblegend-block')
					),
					renderHeadlineField( attributes, setAttributes, 'headline', null )
				),
				createElement(
					'div',
					{ style: containerStyle },
					createElement(
						'p',
						{ style: subtitleStyle },
						__('Szerszy opis', 'weblegend-block')
					),
					renderTextareaField( attributes, setAttributes, 'content', __('Wprowadź treść','weblegend-block'),'p')
				),
				createElement(
					'div',
					{ style: containerStyle },
					createElement(
						'p',
						{ style: subtitleStyle },
						__('Grafika po lewej stronie', 'weblegend-block')
					),

					renderImageField( attributes, setAttributes, 'image', __('Wybierz zdjęcie', 'weblegend-block'))
				),
				createElement(
					'div',
					{ style: containerStyle },
					createElement(
						'p',
						{ style: subtitleStyle },
						__('Infografika', 'weblegend-block')
					),

					renderImageField( attributes, setAttributes, 'image_info', __('Wybierz zdjęcie', 'weblegend-block'))
				),
				createElement(
					'div',
					{ style: containerStyle },
					createElement(
						'p',
						{ style: subtitleStyle },
						__('Kolumny tekstowe', 'weblegend-block')
					),
					createElement(RepeaterField, {attributes: attributes,setAttributes: setAttributes,fieldName: 'columns',fields: repeaterFields,})
				),
				createElement(
					'div',
					{ style: containerStyle },
					createElement(
						'p',
						{ style: subtitleStyle },
						__('Dodatkowe CTA', 'weblegend-block')
					),
					createElement(LinkField, { attributes: attributes, setAttributes: setAttributes, attributeKey: 'link', label: 'Wybierz link',})
				),
			)
	);
};

export default Edit;
