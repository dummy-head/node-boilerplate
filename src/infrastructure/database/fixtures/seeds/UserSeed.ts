import { Factory, Seeder, times } from 'typeorm-seeding';

import { User } from 'infrastructure/database/entities/User';
import { Role } from 'infrastructure/database/entities/Role';

import { USER_ROLE } from 'infrastructure/database/enum/UserRole';
import { Equipment } from 'infrastructure/database/entities/Equipment';
import { Rate } from 'infrastructure/database/entities/Rate';
import { State } from 'infrastructure/database/entities/State';
import { EquipmentStateRate } from 'infrastructure/database/entities/EquipmentStateRate';

export class UserSeed implements Seeder {
  async run(factory: Factory): Promise<any> {
    await this.prepareAdminUserSeeds(factory);
    await this.prepareMemberUserSeeds(factory);
  }

  private async prepareAdminUserSeeds(factory: Factory): Promise<void> {
    const adminRole = await factory(Role)().create({
      name: USER_ROLE.ADMIN,
    });

    await factory(User)().create({
      email: 'onion_admin@example.com',
      role: adminRole,
    });
  }

  private async prepareMemberUserSeeds(factory: Factory): Promise<void> {
    const memberRole = await factory(Role)().create({
      name: USER_ROLE.MEMBER,
    });

    const user = await factory(User)().create({
      email: 'onion_member_1@example.com',
      role: memberRole,
    });

    const rate = await factory(Rate)().create();

    const state = await factory(State)().create({
      rates: [rate],
    });

    const equipment = await factory(Equipment)().create({
      user,
    });

    await factory(EquipmentStateRate)().create({
      equipment,
      state,
      rate,
    });

    await times(5, async () => {
      await factory(Equipment)().create({
        user,
      });
    });
  }
}
