export const ContentCollapsible = {
    props: ['isExpanded'],
    data() {
        return {
            showContent: this.isExpanded || false
        }
    },
    template: `
    <div class="box has-background-white-bis">        

        <a class="link is-size-6 has-text-grey is-pulled-right" @click="showContent = ! showContent">
            <span class="icon">
                <i class="fas fa-chevron-up rotate" :class="{ 'down': showContent }" aria-hidden="true"></i>
            </span>
        </a>

        <slot name="title"></slot>


        <slot v-if="showContent">
        </slot>

    </div>
    `    
}
