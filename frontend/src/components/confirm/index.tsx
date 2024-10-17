import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { confirmable, createConfirmation } from 'react-confirm';

const Confirmation = ({
	okLabel = 'OK',
	cancelLabel = 'Cancel',
	title = 'Confirmation',
	confirmation,
	show,
	proceed,
	enableEscape = true,
}: any) => {
	return (
		<div className="static-modal">
			<Modal
				animation={false}
				show={show}
				onHide={() => proceed(false)}
				backdrop={enableEscape ? true : 'static'}
				keyboard={enableEscape}
			>
				<Modal.Header>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{confirmation}</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={() => proceed(false)}>
						{cancelLabel}
					</Button>
					<Button variant="danger" onClick={() => proceed(true)}>
						{okLabel}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export function confirm(
	confirmation: any,
	proceedLabel = 'OK',
	cancelLabel = 'Cancel',
	options = {}
) {
	return createConfirmation(confirmable(Confirmation))({
		confirmation,
		proceedLabel,
		cancelLabel,
		...options,
	});
}
