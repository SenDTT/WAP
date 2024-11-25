import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Context } from '../Global'
import LoginModal from './LoginModal'
import SignupModal from './SignupModal'

const userNavigation = [
    { name: 'My Votes', href: '#', current: false },
    { name: 'My Posts', href: '#', current: false },
    { name: 'Sign out', href: '#' },
]

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, isAuthenticated, logout } = useContext(Context);
    const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
    const [openSignupModal, setOpenSignupModal] = useState<boolean>(false);

    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:w-4/5">
                        <div className="flex h-16 items-center justify-between">
                            <aside>
                                <div className="flex items-center">
                                    <div className="shrink-0">
                                        <Link to="/"><h1 className="font-mono text-xl text-purple-400 uppercase">Policies</h1></Link>
                                    </div>
                                </div>
                            </aside>
                            <div className='flex flex-row justify-end items-center gap-4'>

                                <div className="flex flex-row justify-center items-center gap-4">
                                    {/* <div className="block">
                                        <div className="flex">
                                            <MagnifyingGlassIcon className="size-5 md:size-6" color="white" />
                                        </div>
                                    </div> */}
                                    <div className="hidden md:block">
                                        {isAuthenticated() && user != null ? (
                                            <div className="ml-4 flex items-center md:ml-6">
                                                {/* Profile dropdown */}
                                                <Menu as="div" className="relative ml-3">
                                                    <div className='flex flex-row justify-end items-center gap-2'>
                                                        <div className="text-base/5 font-medium text-white">{user.fullname}</div>
                                                        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                            <span className="sr-only">Open user menu</span>
                                                            <UserCircleIcon className="size-10 outline-none text-white focus:outline-none" />
                                                        </MenuButton>
                                                    </div>
                                                    <MenuItems
                                                        transition
                                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                                    >
                                                        {userNavigation.map((item) => (
                                                            <MenuItem key={item.name}>
                                                                {
                                                                    item.name == 'Sign out' ? (
                                                                        <button
                                                                            onClick={() => logout()}
                                                                            className="text-left w-full block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                                                        >
                                                                            {item.name}
                                                                        </button>
                                                                    ) : (
                                                                        <Link
                                                                            to={item.href}
                                                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                                                        >
                                                                            {item.name}
                                                                        </Link>
                                                                    )
                                                                }
                                                            </MenuItem>
                                                        ))}
                                                    </MenuItems>
                                                </Menu>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="flex flex-row justify-end items-center gap-2">
                                                    <button onClick={() => setOpenLoginModal(true)} className="rounded p-2 bg-white hover:bg-purple-200">Login</button>
                                                    <button onClick={() => setOpenSignupModal(true)} className="rounded text-white p-2 bg-purple-600 hover:bg-purple-700">Signup</button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
                                    <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                                        <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                                    </DisclosureButton>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="md:hidden">
                        {isAuthenticated() && user != null ? (
                            <div className="border-t border-gray-700 pb-3 pt-4">
                                <div className="flex items-center px-2">
                                    <div className="ml-3">
                                        <div className="text-base/5 font-medium text-white">{user.fullname}</div>
                                        <div className="text-sm font-medium text-gray-400">{user.email}</div>
                                    </div>
                                </div>
                                <div className="mt-3 space-y-1 px-2">
                                    {userNavigation.map((item) => {
                                        if (item.name == 'Sign out') {
                                            return (
                                                <DisclosureButton
                                                    key={item.name}
                                                    as='button'
                                                    onClick={() => logout()}
                                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                                >
                                                    {item.name}
                                                </DisclosureButton>
                                            )
                                        } else {
                                            return (
                                                <DisclosureButton
                                                    key={item.name}
                                                    as='a'
                                                    href={item.href}
                                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                                >
                                                    {item.name}
                                                </DisclosureButton>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        ) : (
                            <>
                                <DisclosureButton
                                    onClick={() => setOpenLoginModal(true)}
                                    as="button"
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                >
                                    Login
                                </DisclosureButton>
                                <DisclosureButton
                                    onClick={() => setOpenSignupModal(true)}
                                    as="a"
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                >
                                    Signup
                                </DisclosureButton>
                            </>
                        )}
                    </DisclosurePanel>
                </Disclosure>

                {/* <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                    </div>
                </header> */}
                <main>
                    <div className="md:w-4/5 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
                </main>

                <LoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
                <SignupModal open={openSignupModal} setOpen={setOpenSignupModal} />
            </div>
        </>
    )
}

export default Layout;