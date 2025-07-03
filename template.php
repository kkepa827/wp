<?php
/**
 * Block Template: about-us
 *
 * @param   array $attributes  The block attributes.
 * @param   string $content    The block default content.
 * @param   WP_Block $block    The block instance.
 */

$class_name 		= isset($block->attributes['className']) ? $block->attributes['className'] : '';
$anchor 			= isset($block->attributes['anchor']) ? $block->attributes['anchor'] : '';

$headline 			= $attributes['headline'];
$content 			= $attributes['content'];

$columns 			= $attributes['columns'];

$backgroundColor 	= $attributes['backgroundColor'];
$textColor 			= $attributes['textColor'];
$svgColor 			= $attributes['svgColor'];
$image				= $attributes['image'];
$image_info			= $attributes['image_info'];
$link 				= $attributes['link'];

?>

<style>
.about-us-block .svg-container svg {
	max-width: 100%;
}
</style>
<div class="about-us-block"
	style="background-color: <?php echo $backgroundColor ? $backgroundColor : ""; ?>">

<section <?php if(!empty($anchor)) : ?>id="<?php echo $anchor; ?>"<?php endif; ?> class="about-us-block <?php echo $class_name; ?>" <?php if(!empty($backgroundColor)): ?>style="background-color: <?php echo $backgroundColor; ?>;"<?php endif; ?>>
	<div class="container relative py-12 lg:py-20">
        <section class="mb-12">
			<?php if(!empty($headline)): ?>
				<div class="mb-4 flex flex-row items-center justify-start gap-4">
					<svg width="48" height="12" viewBox="0 0 48 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<line x1="0.142578" y1="6.5" x2="32.1426" y2="6.5" stroke="#111111"/>
						<circle cx="41.1426" cy="6" r="5.5" stroke="#111111"/>
					</svg>

					<?php echo render_headline($headline, 'uppercase text-black', [$textColor ? 'color: ' . $textColor : ""]) ?>
				</div>
			<?php endif; ?>
			<?php if(!empty($content)): ?>
           		<h2 class="headline-underline mb-8 text-5xl"><?php echo format_text($content); ?></h2>
			<?php endif; ?>
        </section>

        <div class="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-28">
            <div class="relative flex size-full rounded-3xl bg-[#F6F6F6]">
				<?php echo display_image($image, "full", "h-full w-auto object-cover transition-all rounded-lg"); ?>
				<div class="absolute bottom-0 left-0 hidden h-1/3 w-2/5 items-center justify-center rounded-tr-[200px] bg-accent p-5 pr-20 lg:flex">
					<?php echo display_image($image_info, "full", "h-auto w-36 object-cover transition-all rounded-lg"); ?>
				</div>
            </div>
			<?php if($columns): ?>
            <div class="relative flex flex-col gap-6">
				<?php $index = 1; ?>
				<?php foreach($columns as $column): ?>
                <div class="z-10 py-2" >
                    <div class="mb-1 flex items-center">
    					<div class="mr-3 text-3xl uppercase text-gray-400">
    						<?php echo '0'.$index.'.'; $index++; ?>
    					</div>
    					<?php if($column['headline']): ?>
                        	<h4 class="text-2xl"><?php echo $column['headline']; ?></h4>
    					<?php endif; ?>
                    </div>
					<?php if($column['content']): ?>
                    	<div class="description font-light"><?php echo format_text($column['content']); ?></div>
					<?php endif; ?>
                </div>
				<?php endforeach; ?>
            </div>
			<?php endif; ?>

			<!-- <div class="absolute left-0 top-0 size-full lg:-left-14 lg:-top-12">
				<svg viewBox="0 0 1519 659" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="620" height="1" transform="matrix(0 1 1 0 812 14)" fill="#E4E4E4"/>
					<rect x="813" y="14" width="690" height="1" fill="#E4E4E4"/>
					<rect x="2" y="643" width="803" height="1" fill="#E4E4E4"/>
					<circle cx="15.5" cy="643.5" r="15.5" fill="#E4E4E4"/>
					<circle cx="811.5" cy="643.5" r="15.5" fill="#E4E4E4"/>
					<circle cx="1502.64" cy="15.5" r="15.5" fill="#E4E4E4"/>
				</svg>
			</div> -->
        </div>
		<div>
			<?php if($link): ?>
				<?php echo render_button($link, "mt-12 button-accent mx-auto"); ?>
			<?php endif; ?>
		</div>
    </div>
</section>
