'use client';

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';

import Offcanvas from 'react-bootstrap/Offcanvas';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import { schema, FormData, defaultItem, CREATE_EARTHQUAKE, UPDATE_EARTHQUAKE } from './schema';
import { type EarthquakeItem } from '@/types/types';

// Define props type for the component
interface EarthquakeEditFormProps {
	show: boolean;
	formData: EarthquakeItem;
	handleClose: () => void;
}

const EarthquakeEditForm: React.FC<EarthquakeEditFormProps> = ({
	show = false,
	formData = defaultItem,
	handleClose = () => {},
}) => {
	const [
		createEarthquake,
		{ loading: loadingCreate, data: dataCreate, error: errorCreate, reset: resetCreate },
	] = useMutation(CREATE_EARTHQUAKE, {
		refetchQueries: ['GetEarthquakes'],
	});

	const [
		updateEarthquake,
		{ loading: loadingUpdate, data: dataUpdate, error: errorUpdate, reset: resetUpdate },
	] = useMutation(UPDATE_EARTHQUAKE, {
		refetchQueries: ['GetEarthquakes'],
	});

	const [magnitude, setMagnitude] = useState<number>(1);

	const {
		control,
		register,
		handleSubmit,
		getValues,
		watch,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
		values: formData,
		defaultValues: {
			magnitude: 1,
		},
	});

	const onSubmit = (data: EarthquakeItem) => {
		if (data?.id > 0) {
			updateEarthquake({ variables: data });
		} else {
			createEarthquake({ variables: data });
		}
	};

	const getMagnitudeType = () => {
		switch (true) {
			case magnitude >= 8:
				return 'danger';
			case magnitude >= 6:
				return 'warning';
			default:
				return 'success';
		}
	};

	const getMagnitudeDescription = () => {
		// Based on the Richter scale
		switch (true) {
			case magnitude >= 9:
				return 'Extreme';
			case magnitude >= 8:
				return 'Great';
			case magnitude >= 7:
				return 'Major';
			case magnitude >= 6:
				return 'Strong';
			case magnitude >= 5:
				return 'Moderate';
			case magnitude >= 4:
				return 'Light';
			case magnitude >= 3:
				return 'Slight';
			case magnitude >= 2:
				return 'Minor';
			default:
				return 'Micro';
		}
	};

	const watchAllFields = watch(); // Watch all form fields

	useEffect(() => {
		const v = getValues(); // Get the current form values
		setMagnitude(v.magnitude);
	}, [watchAllFields]);

	useEffect(() => {
		// Handle the result of the create mutation
		if (!loadingCreate && dataCreate && !errorCreate) {
			resetCreate();
			handleClose();
		}
	}, [loadingCreate, dataCreate, errorCreate]);

	useEffect(() => {
		// Handle the result of the update mutation
		if (!loadingUpdate && dataUpdate && !errorUpdate) {
			resetUpdate();
			handleClose();
		}
	}, [loadingUpdate, dataUpdate, errorUpdate]);

	return (
		<Offcanvas placement="end" show={show} onHide={handleClose}>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Edit Form</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				{/* @ts-ignore */}
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<Controller
						name="date"
						control={control}
						render={({ field }) => (
							<FloatingLabel controlId="date" label="Date" className="mb-3">
								<Form.Control
									type="datetime-local"
									placeholder="Date"
									isInvalid={!!errors.date}
									{...field}
									value={new Date(field?.value).toISOString().slice(0, 16)}
								/>
								<Form.Control.Feedback type="invalid">{errors.date?.message}</Form.Control.Feedback>
							</FloatingLabel>
						)}
					/>

					<FloatingLabel controlId="lat" label="Latitude" className="mb-3">
						<Form.Control
							type="number"
							placeholder="Latitude"
							isInvalid={!!errors.lat}
							{...register('lat')}
						/>
						<Form.Control.Feedback type="invalid">{errors.lat?.message}</Form.Control.Feedback>
					</FloatingLabel>

					<FloatingLabel controlId="lng" label="Longitude" className="mb-3">
						<Form.Control
							type="number"
							placeholder="Longitude"
							isInvalid={!!errors.lng}
							{...register('lng')}
						/>
						<Form.Control.Feedback type="invalid">{errors.lng?.message}</Form.Control.Feedback>
					</FloatingLabel>

					<Form.Label className="mt-4">
						Magnitude{' '}
						<Badge bg={getMagnitudeType()}>
							{magnitude} {getMagnitudeDescription()}
						</Badge>
					</Form.Label>
					<Form.Range min={1} max={9.9} step={0.1} {...register('magnitude')} />
					<p>{errors.magnitude?.message}</p>

					<Button variant="primary" type="submit">
						Submit
					</Button>
				</form>
			</Offcanvas.Body>
		</Offcanvas>
	);
};

export default EarthquakeEditForm;
