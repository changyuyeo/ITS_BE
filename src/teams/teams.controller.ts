import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	UseGuards
} from '@nestjs/common'

import { CurrentUser } from '@common/decorators/user.decorator'
import { TeamCreateDto } from '@teams/dto/team.create.dto'
import { TeamQueryDto } from '@teams/dto/team.query.dto'
import { TeamsService } from '@teams/teams.service'
import { JwtAuthGuard } from '@users/jwt/jwt.guard'
import { User } from '@users/users.schema'

@Controller('teams')
export class TeamsController {
	constructor(private readonly teamsService: TeamsService) {}

	//* 모든 팀 조회 api
	@Get()
	getAllTeamList(@Query() query: TeamQueryDto) {
		return this.teamsService.getAllTeams(query)
	}

	//* 특정 팀 조회 api
	@Get(':id')
	getOneTeamData(@Param('id') teamId: string) {
		return this.teamsService.getOneTeam(teamId)
	}

	//* 팀 생성 api
	@Post('/create')
	@UseGuards(JwtAuthGuard)
	createTeam(@Body() body: TeamCreateDto, @CurrentUser() user: User) {
		return this.teamsService.create(user.id, body)
	}
}
