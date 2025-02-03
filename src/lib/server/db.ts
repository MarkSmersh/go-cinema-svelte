import { MikroORM } from '@mikro-orm/postgresql';
import { DB_STRING } from '$env/static/private';
import {
	Movie,
	Place,
	Cinema,
	Rating,
	Ticket,
	Contact,
	PlaceType
} from '$lib/server/models/models';

export const orm = await MikroORM.init({
	entities: [Movie, Place, Cinema, Rating, Ticket, Contact, PlaceType],
	clientUrl: DB_STRING,
	allowGlobalContext: true,
	forceEntityConstructor: true
});

export const em = orm.em;
