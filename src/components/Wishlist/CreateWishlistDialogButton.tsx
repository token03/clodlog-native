import {
    Button,
    Dialog,
    Fieldset,
    Input,
    Label,
    PopoverProps,
    Unspaced,
    XStack,
    YStack,
} from 'tamagui';
import { Plus, X } from '@tamagui/lucide-icons';
import { useWishlists } from '@/contexts/WishlistContext';
import { useEffect, useState } from 'react';
import { Wishlist } from '@/types/interfaces/wishlist';

export function CreateWishlistDialogButton({
    afterCreate,
    ...props
}: PopoverProps & { afterCreate?: (wishlist: Wishlist) => void }) {
    const { items: wishlists, createItem: createWishlist } = useWishlists();
    const [name, setName] = useState('');
    const [isValid, setIsValid] = useState(true);

    const checkExistingNameInWishlist = (name: string) => {
        return wishlists.some(wishlist => wishlist.name === name);
    };

    useEffect(() => {
        setIsValid(!checkExistingNameInWishlist(name));
    }, [name]);

    const handleCreateWishlist = async (name: string) => {
        if (isValid) {
            const newWishlist = await createWishlist(name);
            afterCreate && newWishlist && afterCreate(newWishlist);
        }
    };

    return (
        <Dialog modal>
            <Dialog.Trigger asChild>
                <Button
                    size={'$3'}
                    style={{ position: 'absolute', padding: 15, right: 20, bottom: 20 }}
                >
                    <Plus size={'$1'} />
                    Add Wishlist
                </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay
                    key='overlay'
                    animation='slow'
                    opacity={0.5}
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                />
                <Dialog.Content
                    elevate
                    key='content'
                    animation={[
                        'quick',
                        {
                            opacity: {
                                overshootClamping: true,
                            },
                        },
                    ]}
                    borderWidth={0}
                    enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                    exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                    width={'90%'}
                    gap={'$3'}
                    backgroundColor={'$black2'}
                >
                    <Dialog.Title size={'$7'}>Create Wishlist</Dialog.Title>
                    <YStack>
                        <Fieldset horizontal borderWidth={0} gap={'$3'}>
                            <Label>Name:</Label>
                            <Input
                                size={'$3'}
                                onChangeText={setName}
                                style={{
                                    borderColor: isValid ? undefined : '#ff5050',
                                    color: isValid ? undefined : '#ff9999',
                                }}
                            />
                        </Fieldset>
                    </YStack>

                    <XStack justifyContent={'flex-end'} gap={'$3'}>
                        <Dialog.Close displayWhenAdapted asChild>
                            <Button size={'$3'} chromeless>
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close displayWhenAdapted asChild>
                            <Button
                                size={'$3'}
                                theme='active'
                                aria-label='Close'
                                disabled={!isValid}
                                onPress={() => handleCreateWishlist(name)}
                            >
                                Add
                            </Button>
                        </Dialog.Close>
                    </XStack>

                    <Unspaced>
                        <Dialog.Close asChild>
                            <Button
                                position='absolute'
                                top='$3'
                                right='$3'
                                size='$2'
                                circular
                                icon={X}
                            />
                        </Dialog.Close>
                    </Unspaced>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
}
