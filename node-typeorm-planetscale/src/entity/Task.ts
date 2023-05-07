import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index
} from "typeorm";

export enum TaskStatus {
    PENDING = "pending",
    IN_PROGRESS = "in_progress",
    DONE = "done"
}

@Entity({ name: "tasks" })
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({  unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Index()
    @Column({ type: 'varchar', length: 20, default: TaskStatus.PENDING })
    status: TaskStatus;

    @Column({ name: 'due_date', type: 'date' })
    dueDate: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}