<template>
	<div>
		<template v-if='position === "L"'>
			<div id="squeeze-board-L" class="squeeze_l">
			<canvas id="squeeze-canvas-L" ref="squeezeCanvas" :class="[(_getSqueezeUpdate.L1 || _getSqueezeUpdate.L2 || _getSqueezeUpdate.L3) && (_getSqueezeUpdate.HP !== _getUserID)? '--canvas-hide-L' : '--canvas-show-L' ]" resize />
			<template v-if="_getSqueezeUpdate.isSqueeze && _getSqueezeUpdate.leftS"> 
				<div class='squeeze-message-L' :class="[_getSqueezeUpdate.playerId === _getUserID ? '--message-hide' : '--message-show']">
					<div class='-message'>{{ tt('Other player is squeezing now, please wait for a while.') }}</div>
					<div class="--card-vid-L">
					<template v-if="_getSqueezeUpdate.L1 || _getSqueezeUpdate.L2">
					<div class='--card-1-L' :class="[_getSqueezeUpdate.L1 ? 'blue__gif' : 'unanimated__blue']"></div>
					<div class='--card-2-L' :class="[_getSqueezeUpdate.L2 ? 'blue__gif' : 'unanimated__blue']"></div>
					</template>
					<template v-if="!_getSqueezeUpdate.L2 && !_getSqueezeUpdate.L1">
					<div class='--card-3-L' :class="[_getSqueezeUpdate.L3 ? 'blue__gif' : '']"></div>
					</template>
					</div>
				</div>
			</template>
			
			<template v-if="wherebetis === 'P'">
			<div class="rotate-btn-a-L" @click="onRotateCardL()">{{ tt('ROTATE') }}</div>
			</template>
			<template v-if="wherebetis === 'PB'">
			<div class="rotate-btn-a-L" @click="onRotateCardL()">{{ tt('ROTATE') }}</div>
			</template>
			</div>
		</template>
		<template v-if='position === "R"'>
			<div id="squeeze-board-R" class="squeeze_r">
			<canvas id="squeeze-canvas-R" ref="squeezeCanvas" :class="[(_getSqueezeUpdate.R1 || _getSqueezeUpdate.R2 || _getSqueezeUpdate.R3) && (_getSqueezeUpdate.HB !== _getUserID) ? '--canvas-hide-R' : '--canvas-show-R' ]" resize />
			<template v-if="_getSqueezeUpdate.isSqueeze && _getSqueezeUpdate.rightS"> 
				<div class='squeeze-message-R' :class="[_getSqueezeUpdate.playerId === _getUserID ? '--message-hide' : '--message-show']">
					<div class='-message'>{{ tt('Other player is squeezing now, please wait for a while.') }}</div>
					<div class="--card-vid-R">
					<template v-if="_getSqueezeUpdate.R2 || _getSqueezeUpdate.R1">
					<div class='--card-1-R' :class="[_getSqueezeUpdate.R2 ? 'red__gif' : 'unanimated__red']"></div>
					<div class='--card-2-R' :class="[_getSqueezeUpdate.R1 ? 'red__gif' : 'unanimated__red']"></div>
					</template>
					<template v-if="!_getSqueezeUpdate.R2 && !_getSqueezeUpdate.R1">
					<div class='--card-3-R' :class="[_getSqueezeUpdate.R3 ? 'red__gif' : '']"></div>
					</template>
					</div>
					
				</div>
			</template>
			<template v-if="wherebetis === 'B' ">
			<div class="rotate-btn-a-R" @click="onRotateCardR()">{{ tt('ROTATE') }}</div>
			</template>
			<template v-if="wherebetis === 'PB'">
			<div class="rotate-btn-a-R" @click="onRotateCardR()">{{ tt('ROTATE') }}</div>
			</template>
			</div>
		</template>
	</div>
</template>

<script>
 import config from '@/library/SqueezeBoardConfig.js'
export default {
   mixins: [ config ],
}
</script>
<style lang="scss">

$squeeze-height: 320px;
$squeeze-bg: $base-color;

.--canvas-hide-L,.--canvas-hide-R {
	opacity: 0;
}

.--canvas-show-L,.--canvas-show-R {
	opacity: 1;
}

#card-back-red {
	width: 100%;
	height: 100%;
	position: relative;
}

.--card-vid-L{
	width: 100%;
	height: 100%;

	display: flex;
	// align-items: center;
	// justify-content: center;
	position: absolute;
	bottom: 0;
	.--card-1-L,.--card-2-L,.--card-3-L {
		width: 32%;
		height: 100%;
		position: absolute !important;
	}
	.--card-1-L{
		right: 45px;
		// background-color: red;
	}
	.--card-2-L {
		left: 45px;
		// background-color: blue;
	}
	.--card-3-L {
		left: 146px;
		// background-color: green;
	}
}

.--card-vid-R{
	width: 100%;
	height: 100%;

	display: flex;
	// align-items: center;
	// justify-content: center;
	position: absolute;
	bottom: 0;
	.--card-1-R,.--card-2-R,.--card-3-R {
		width: 32%;
		height: 100%;
		position: absolute !important;
	}
	.--card-1-R{
		right: 45px;
		// background-color: red;
	}
	.--card-2-R {
		left: 45px;
		// background-color: blue;
	}
	.--card-3-R {
		left: 146px;
		// background-color: green;
	}
}

.squeeze_r,
.squeeze_l {
	@include position(absolute, $bottom: 0, $index: 9);
	width: 100%;
	@include rem((
		height: $squeeze-height,
	));
	margin: auto;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	-webkit-backdrop-filter: blur(10px);
	backdrop-filter: blur(10px);
	background-color: rgba($base-color, .25) !important;
}

.squeeze_l {
	left: 0;
	border-top-right-radius: 10px;

	#squeeze-canvas-L{
		width: 100%;
		height: 100%;
		padding: 20px;
		cursor: pointer;
	}


	.rotate-btn-a-L {
		
		position: absolute;
		padding: 2px 10px;
		top: 5px;
		left: 5px;

		border: 1px solid #daa520; 
		border-radius: 5px;
		background-color: rgba(#daa520, 0.2);

		font-size: 16px;
		color: #daa520;
		display: none;
	}

}



.squeeze_r {
	right: 0;
	border-top-left-radius: 10px;

	#squeeze-canvas-R{
		width: 100%;
		height: 100%;
		padding: 20px;
		cursor: pointer;
	}

	.rotate-btn-a-R {
		
		position: absolute;
		padding: 2px 10px;
		top: 5px;
		right: 5px;

		border: 1px solid #daa520; 
		border-radius: 5px;
		background-color: rgba(#daa520, 0.2);

		font-size: 16px;
		color: #daa520;
		display: none;
	}

}
.--is-show-rotate {
	display: block;
}
.--is-hide-rotate {
	display: none;
}


.squeeze-message-R, .squeeze-message-L {
	width: 100%;
	height: 100%;
	display: none;
	align-items: center;
	justify-content: center;
	position: absolute;
	background-color: rgba($base-color, .5);
	bottom: 0;
	.-message {
		z-index: 10;
		opacity: 1;
		font-size: 25px;
		padding: 3%;
		color: white;
		text-align: center
	}
}

.--message-hide {
	display: none;
	
}
.--message-show {
	display: flex;
}

</style>


