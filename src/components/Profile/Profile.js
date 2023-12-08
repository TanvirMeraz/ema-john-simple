import React, { useRef, useState } from 'react';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import styles from './Profile.module.scss';

const Profile = () => {
	const [user] = useAuthState(auth);

	const [name, setName] = useState(user?.displayName);

	const [nameEditable, setNameEditable] = useState(false);

	const [updateProfile, updateProfileError] = useUpdateProfile(auth);

	const nameRef = useRef();
	const phoneRef = useRef();

	const handleNameChange = async () => {
		const success = await updateProfile({ displayName: name });
		if (success) {
			toast.success('User name updated');
		}
		if (updateProfileError) {
			toast.error('User name cannot be updated');
		}
		setNameEditable(false);
	};

	return (
		<div className={styles.profile}>
			<div className={styles.profileContainer}>
				<form className={styles.profileForm}>
					<div className={styles.inputGroup}>
						<label htmlFor='name' className='name'>
							Name:{' '}
						</label>
						<input
							type='text'
							value={name}
							placeholder={name ? '' : 'Not Specified'}
							onChange={(e) => setName(e.target.value)}
							readOnly={!nameEditable}
							id='name'
							ref={nameRef}
							style={
								nameEditable
									? { borderColor: 'olive' }
									: { borderColor: 'transparent' }
							}
						/>
						{!nameEditable ? (
							<i
								className={`bi bi-pencil ${styles.editIcon} ${styles.icon}`}
								onClick={() => {
									setNameEditable(true);
									nameRef.current.focus();
								}}
							></i>
						) : (
							<i
								className={`bi bi-check-circle ${styles.doneIcon} ${styles.icon}`}
								onClick={() => handleNameChange()}
							></i>
						)}
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor='email' className='email'>
							Email:{' '}
						</label>
						<input
							type='text'
							value={user?.email}
							readOnly
							disabled
							id='email'
						/>
					</div>

					<div className={styles.inputGroup}>
						<label htmlFor='verifyEmail' className='verifyEmail'>
							Email Verified:{' '}
						</label>
						<input
							type='text'
							value={user?.emailVerified ? 'Yes' : 'No'}
							readOnly
							id='verifyEmail'
						/>
					</div>
				</form>

				{user?.photoURL ? (
					<img
						src={user?.photoURL}
						alt='Profile'
						className={styles.profilePic}
					></img>
				) : (
					<i className={`bi bi-person-circle ${styles.profilePicIcon}`}></i>
				)}
			</div>
		</div>
	);
};

export default Profile;
