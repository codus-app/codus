<template>
  <modal
    v-bind:open="open"
    v-on:close="$emit('close')"
    v-bind:modalStyle="{
      backgroundColor: '#131313',
      width: '20rem',
      padding: '1rem',
      marginRight: '-12rem',
      height: modalHeight,
      transition: `${modalBaseTransition}, height .25s`,
    }"
    fade-color="rgba(30, 30, 33, .65)"
    v-bind:wide="true"
  >
    <!-- Back arrow -->
    <transition-fade>
      <icon-arrow-left v-if="page !== 'list'" v-on:click="page = 'list'"></icon-arrow-left>
    </transition-fade>


    <div class="page-wrapper" ref="pageWrapper">

      <!-- "list" page has links to the other pages -->

      <transition name="above">
        <div class="page" v-if="page === 'list'">
          <h2>Invite students</h2>

          <div class="methods">
            <div class="method" v-on:click="page = 'email'">
              <div class="icon"> <icon-mail></icon-mail> </div>
              Email
            </div>

            <div class="method" v-on:click="page = 'code'">
              <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 16">
                  <!-- eslint-disable-next-line max-len -->
                  <path fill="currentColor" d="M6.65 12.72h3.42V15H.79v-2.28h3.48v-8.7l-3.04.82V2.6L6.65.98v11.74zM12.3 15c0-.96.12-1.837.36-2.63.24-.793.59-1.48 1.05-2.06a9.52 9.52 0 0 1 1.44-1.48c.5-.407 1.09-.81 1.77-1.21.72-.44 1.273-.86 1.66-1.26s.58-.887.58-1.46-.18-1.033-.54-1.38c-.36-.347-.847-.52-1.46-.52-1.253 0-2.107.58-2.56 1.74l-2.12-.96a4.63 4.63 0 0 1 1.79-2.19c.833-.553 1.783-.83 2.85-.83 1.373 0 2.457.383 3.25 1.15.793.767 1.19 1.743 1.19 2.93 0 .613-.083 1.16-.25 1.64-.167.48-.44.913-.82 1.3-.38.387-.747.703-1.1.95a22.8 22.8 0 0 1-1.45.91c-1.653 1-2.607 2.027-2.86 3.08h6.6V15H12.3zm16.27.24c-1.173 0-2.163-.293-2.97-.88-.807-.587-1.41-1.387-1.81-2.4l2.14-.88c.6 1.28 1.5 1.92 2.7 1.92.68 0 1.24-.18 1.68-.54.44-.36.66-.86.66-1.5 0-.627-.203-1.133-.61-1.52s-1.003-.58-1.79-.58h-1.26V6.6h1.2c.587 0 1.06-.163 1.42-.49.36-.327.54-.763.54-1.31 0-.533-.173-.967-.52-1.3-.347-.333-.8-.5-1.36-.5-.96 0-1.7.5-2.22 1.5l-2.14-.82a4.87 4.87 0 0 1 1.69-2.12c.753-.533 1.643-.8 2.67-.8 1.24 0 2.26.36 3.06 1.08.8.72 1.2 1.627 1.2 2.72 0 1.347-.573 2.353-1.72 3.02a3.558 3.558 0 0 1 1.62 1.28c.413.587.62 1.28.62 2.08 0 1.32-.443 2.367-1.33 3.14-.887.773-2.043 1.16-3.47 1.16z"/>
                </svg>
              </div>
              Invite code
            </div>

            <div class="method" v-on:click="page = 'link'">
              <div class="icon"> <icon-link></icon-link> </div>
              Share link
            </div>
          </div>
        </div>
      </transition>

      <!-- "email" page allows sending email invitations -->

      <transition name="below">
        <div class="page" v-if="page === 'email'">
          <h2>Send email invitations</h2>
          UI here!
          <div>blah</div>
          <div>blah</div>
          <div>blah</div>
          <div>blah</div>
        </div>
      </transition>

      <!-- "code" page allows copying/displaying invite code -->

      <transition name="below">
        <div class="page" v-if="page === 'code'">
          <h2>Share invite code</h2>
          <div class="invite-code">
            {{ classroom.code }}
            <icon-maximize></icon-maximize>
          </div>
        </div>
      </transition>

      <!-- "link" page allows copying invitation link -->

      <transition name="below">
        <div class="page" v-if="page === 'link'">
          <h2>Share invite link</h2>
          Link goes here!
        </div>
      </transition>

    </div>
  </modal>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
<style scoped lang="sass" src="./methods.sass"></style>
<style scoped lang="sass" src="./invite-code.sass"></style>
