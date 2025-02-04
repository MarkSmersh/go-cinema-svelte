import {
	Entity,
	PrimaryKey,
	OneToOne,
	Property,
	Collection,
	OneToMany,
	ManyToOne
} from '@mikro-orm/core';

@Entity()
export class Movie {
	@PrimaryKey({ type: 'int' })
	id!: number;

	@Property({ type: 'string' })
	title!: string;

	@Property({ type: 'string' })
	descripton!: string;

	@Property({ type: 'int' })
	year!: number;

	@OneToMany(() => Rating, 'movie', { orphanRemoval: true })
	ratings = new Collection<Rating>(this);
}

@Entity()
export class Rating {
	@PrimaryKey({ type: 'int' })
	id!: number;

	@ManyToOne(() => Movie)
	movie!: Movie;

	@Property({ type: 'int' })
	value!: number;

	@Property()
	createdAt = new Date();
}

@Entity()
export class Cinema {
	@PrimaryKey({ type: 'int' })
	id!: number;

	@Property({ type: 'string' })
	title!: string;

	@Property({ type: 'string' })
	description!: string;

	@Property({ type: 'int' })
	width!: number;

	@OneToMany(() => Place, 'cinema', { orphanRemoval: true })
	places = new Collection<Place>(this);
}

@Entity()
export class Place {
	@PrimaryKey({ type: 'int' })
	id!: number;

	@ManyToOne(() => Cinema)
	cinema!: Cinema;

	@ManyToOne(() => PlaceType)
	placeType!: PlaceType;

	@OneToOne(() => Ticket, { nullable: true })
	ticket?: Ticket | null = null;

	@Property({ type: 'int' })
	col!: number;

	@Property({ type: 'int' })
	row!: number;
}

@Entity()
export class PlaceType {
	@PrimaryKey({ type: 'int' })
	id!: number;

	@Property({ type: 'string' })
	description!: string;

	@OneToMany(() => Place, 'placeType', { orphanRemoval: true })
	places = new Collection<Place>(this);

	@Property({ type: 'int' })
	price!: number;
}

@Entity()
export class Ticket {
	@PrimaryKey({ type: 'uuid' })
	id!: string;

	@OneToOne(() => Place)
	place!: Place;

	@OneToOne(() => Contact)
	contact!: Contact;

	@Property()
	createdAt = new Date();
}

@Entity()
export class Contact {
	@PrimaryKey({ type: 'int' })
	id!: number;

	@Property({ type: 'string' })
	firstName!: string;

	@Property({ type: 'string' })
	surname!: string;

	@Property({ type: 'string' })
	phoneNumber!: string;

	// @OneToOne(() => Ticket, { nullable: true })
	// ticket?: Ticket | null = null;
}
